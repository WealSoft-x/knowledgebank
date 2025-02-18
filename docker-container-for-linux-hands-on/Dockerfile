# ベースイメージとしてUbuntuを使用
FROM ubuntu:22.04

# entrypoint.sh をコンテナにコピー
COPY entrypoint.sh /entrypoint.sh

# 実行権限を付与
RUN chmod +x /entrypoint.sh

# シェルを明示的に指定してエントリポイントを設定
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]

# パッケージリストを更新し、必要なソフトウェアをインストール
RUN apt-get update && apt-get -y install --fix-missing \
    bash \
    coreutils \
    grep \
    iproute2 \
    iputils-ping \
    traceroute \
    tcpdump \
    bind9-dnsutils \
    dnsmasq-base \
    netcat-openbsd \
    python3 \
    curl \
    wget \
    iptables \
    procps \
    isc-dhcp-client && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# デフォルトのシェルを bash に設定
CMD ["/bin/bash"]
