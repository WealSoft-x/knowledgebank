# 説明
分科会で使用するソースや参考となるソースを配置しております。

# リポジトリの使い方
一旦はgitアカウントは作成せず、各個人のssh公開鍵を登録し、運用を行う。

# ソースpush時の事前作業
ソースをpushする場合、以下対応をお願いします。

## CRLF自動変換削除
git config --global core.autocrlf false

## ユーザ名の登録
git config --global user.name "ユーザー名"

## メールアドレスの登録
git config --global user.email メールアドレス
