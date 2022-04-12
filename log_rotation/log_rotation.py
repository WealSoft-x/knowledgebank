##--------------------------------------------------------------------------------------------------------------------------------
## ツール名       ： ログローテート
## 処理概要       ： setting.jsonの「log_rotation」項目から、対象ディレクトリのファイルに対し、
##                   指定された日付でローテートする
## 作成者         ： T.Suguru
## 作成日         ： 2021/05/21
## 最終更新者     ：
## 最終更新日     ：
## バージョン     ： Ver. 1.0
## 起動条件       ： py log_rotation.py
## 引数           :
##                引数1：転送先リスト
## ACL            ：
## 文字コード     ： LANG=ja_JP.UTF-8
## 改行コード     ： CRLF
## リターン・コード:
## 備考           ：
##--------------------------------------------------------------------------------------------------------------------------------
## ＜変更履歴＞
## Ver. 変更管理No. 日付         更新者       変更内容
## 1.0  -           2021/05/21  T.Suguru    新規作成
##--------------------------------------------------------------------------------------------------------------------------------

import common_function
import json
import os
import datetime
import re
import zipfile

class TargetZipFile:
    def __init__(self, term = "", zip_file_list = []):
        self._term = term
        self._zip_file_list = zip_file_list

class DateOfFromTo:
    def __init__(self, from_date = "", to_date = ""):
        self._from_date = from_date
        self._to_date = to_date

class MatchFile:
    def __init__(self, full_path = "", file_timestamp = "", file_month = "", file_year = ""):
        self._full_path = full_path
        self._file_timestamp = file_timestamp
        self._file_month = file_month
        self._file_year = file_year

###############################################################################
#  関数名： 当年日付間隔取得
#  処理概要： 指定年月日週区分を確認し、引数3に指定された年リストから当年日付間隔を取得し、
#            当年日付間隔リストとして返却する
#  引数1： str (1文字) 指定年月日週区分
#  引数2： int 指定ローテート間隔
#  引数3: list 指定ディレクトリ内ファイル更新日付より抽出した重複の無い年リスト
#  戻り値： list 当年日付間隔リスト
###############################################################################
def get_day_term(compression_date_section, compression_number_of, file_year_list):

    date_list = []
    for file_year in file_year_list:
        if compression_date_section == "y":
            date_list.append(file_year)

        elif compression_date_section == "m":
            if compression_number_of == 1:
                i = 1
                while i <= 12:
                    if i < 10:
                        date_list.append("".join([file_year, "/0", str(i)]))
                    else:
                        date_list.append("".join([file_year, "/", str(i)]))
                    i+=1
            else:
                i = 1
                while i <= 12:
                    date_of_from_to = DateOfFromTo()
                    if i < 10:
                        date_of_from_to.from_date = ("".join([file_year, "/0", str(i)]))
                    else:
                        date_of_from_to.from_date = ("".join([file_year, "/", str(i)]))
                    to_date = i + compression_number_of -1

                    if to_date > 12:
                        to_date = 12

                    if to_date < 10:
                        date_of_from_to.to_date = ("".join([file_year, "/0", str(to_date)]))
                    else:
                        date_of_from_to.to_date = ("".join([file_year, "/", str(to_date)]))

                    date_list.append(date_of_from_to)
                    i += compression_number_of

        elif compression_date_section == "d" or compression_date_section == "w":
            first_date = "".join([file_year, "/01/01"])
            last_date = "".join([file_year, "/12/31"])
            last_datetime = datetime.datetime.strptime(last_date, "%Y/%m/%d")
            comp_datetime = datetime.datetime.strptime(first_date, "%Y/%m/%d")

            while comp_datetime < last_datetime:
                from_date = comp_datetime
                added_date = datetime.timedelta(days=compression_number_of) if compression_date_section == "d" else datetime.timedelta(weeks=compression_number_of)
                comp_datetime = comp_datetime + added_date

                if(comp_datetime >= last_datetime):
                   comp_datetime = last_datetime

                to_date = comp_datetime
                date_of_from_to = DateOfFromTo()
                date_of_from_to.from_date = from_date
                date_of_from_to.to_date = to_date
                date_list.append(date_of_from_to)
                comp_datetime = comp_datetime + datetime.timedelta(days=1)

    return date_list

if __name__ == "__main__":
    json_open = common_function.read_settings()
    log_rotation = json.load(json_open)["log_rotation"]

    # json項目取得
    for log_items in log_rotation:
        compression_date_section = log_items["compression"]["search_term"]["date_section"]
        compression_number_of = log_items["compression"]["search_term"]["number_of"]
        target_dir = log_items["target"]["dir"]
        target_file = log_items["target"]["file"]
        compression_file_title = log_items["compression"]["file_title"]
        compression_method = log_items["compression"]["method"]
        compression_dir = log_items["compression"]["dir"]

        # 存在ファイルの年月リストを取得
        file_year_list = []
        match_file_list = []
        for file_name in os.listdir(target_dir):
            match = re.search(target_file, file_name)
            if match is not None:
                # ファイルパスを取得
                full_path = os.path.join(target_dir, file_name)
                # 更新日付取得
                file_update_time = common_function.get_file_updatetime(full_path)
                file_timestamp = common_function.modify_hhmmss_zero(file_update_time)
                file_month = common_function.get_month(file_update_time)
                file_year = common_function.get_year(file_update_time)
                file_date = MatchFile()
                file_date.full_path = full_path
                file_date.file_timestamp = file_timestamp
                file_date.file_month = file_month
                file_date.file_year = file_year
                match_file_list.append(file_date)
                file_updated = file_timestamp.strftime("%Y")
                file_year_list.append(file_updated)

        # set()で重複を省く
        result_day_term = get_day_term(compression_date_section, compression_number_of, list(set(file_year_list)))

        zip_list = []
        # 取得した日付間隔をループ
        for day_term in result_day_term:
            term_zip_file_list = []
            zip_name = ""

            # 日付、週間隔の場合
            if compression_date_section == "d" or compression_date_section == "w":
                today = common_function.modify_hhmmss_zero(datetime.datetime.now())
                # 今日が指定範囲内であれば、スキップ
                if day_term.from_date <= today <= day_term.to_date:
                    continue

                zip_name = "".join([str(day_term.from_date).split()[0], str(day_term.to_date).split()[0][-3:], ".zip"])
                # 指定ディレクトリ内ファイルをループ
                for match_file in match_file_list:
                    # ファイル更新日付が指定日付、週間隔の内の場合
                    if day_term.from_date <= match_file.file_timestamp <= day_term.to_date:
                        term_zip_file_list.append(match_file.full_path)

            elif compression_date_section == "m":
                today = common_function.get_month(datetime.datetime.now())

                if hasattr(day_term, "from_date"):
                    from_date_year = day_term.from_date[:4]
                    from_date_month = int(day_term.from_date[-2:])
                    today_year = str(today)[:4]
                    today_month = int(str(today)[-2:])
                    to_date_month = int(day_term.to_date[-2:])

                    if from_date_year == today_year:
                        if from_date_month <= today_month <= to_date_month:
                            continue

                        zip_name = "".join([str(day_term.from_date).split()[0].replace("/", "-"), "-", str(day_term.to_date).split()[0][-2:], ".zip"])

                        for match_file in match_file_list:
                            # ファイル更新日付が指定日付、週間隔の内の場合
                            file_year = match_file.file_year[:4]
                            file_month = int(match_file.file_month[-2:])
                            if from_date_year == file_year:
                                if from_date_month <= file_month <= to_date_month:
                                    term_zip_file_list.append(match_file.full_path)

                else:
                    # 今日が指定月であれば、スキップ
                    if day_term == today:
                        continue
                    zip_name = "".join([day_term.replace("/", "-"), ".zip"])
                    for match_file in match_file_list:
                        # ファイル更新日付が指定日付、週間隔の内の場合
                        if day_term == match_file.file_month:
                            term_zip_file_list.append(match_file.full_path)

            elif compression_date_section == "y":
                zip_name = "".join([day_term, ".zip"])
                for match_file in match_file_list:
                    today = common_function.get_year(datetime.datetime.now())
                    # 今日が指定年であれば、スキップ
                    if day_term == today:
                        continue
                    # ファイル更新日付が指定日付、週間隔の内の場合
                    elif day_term == match_file.file_year:
                        term_zip_file_list.append(match_file.full_path)

            if len(term_zip_file_list) > 0:
                target_zip_file = TargetZipFile()
                target_zip_file.term = zip_name
                target_zip_file.zip_file_list = term_zip_file_list
                zip_list.append(target_zip_file)

        # 圧縮処理
        for target_zip_file_out in zip_list:
            zip_file_path = os.path.join(target_dir, "".join([target_zip_file_out.term, compression_file_title]))
            if compression_method == "zip":
                with zipfile.ZipFile(zip_file_path, 'w', compression=zipfile.ZIP_DEFLATED) as new_zip:
                    for target_zip_file in target_zip_file_out.zip_file_list:
                        zip_file_name = os.path.basename(target_zip_file)
                        new_zip.write(target_zip_file, zip_file_name)
                        os.remove(target_zip_file)
