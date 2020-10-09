# 『レベルアップNode.js』の学習用レポジトリ
## レベルアップNode.js第１・２章メモ
### dependenciesになんかパッケージをインストールしたとき
```json
"dependencies": {
	"express": "^4.17.1"
}
```

^　← これはキャレットと読むらしい。

キャレットがあると、完全なバージョン固定にならない！
完全なバージョン固定にするには、、、
1. package.jsonを開いてキャレットを削除したり、
2. インストールする時に、`npm install --save-exact express` としたり

でもこれは面倒。それを解決するのが、、、、「.npmrc」ファイル！！！
はい、早速よく分からんファイル名。なんやねんrcって。
場所は、ホームディレクトリ直下にあった！
Qiitaの記事も載っけておこう。
[project毎のnpmコマンドをいい感じにするnpmrc & config達 - Qiita](https://qiita.com/terrierscript/items/86dbfd26abe6905756c0)

`npx something-package --init`は使えるね。

### パッケージ選定基準
1. メンテナンスが継続されているか（メンテナンス性）
→最終更新日、コントリビューター数
2. パッケージに関する情報量（人気や知名度）
→GitHubスター数、ネット検索ヒット件数

### パッケージ名を間違えてマルウェアに感染する事例あり！！
タイプミスでマルウェアに感染とか笑えん。。。
#### 間違えない為の対策
リポジトリーのページで記載されている正規のコマンドを使う
NPMのページに行って、そこからコピペする

### Yarn
Yarnは速い、安全、信頼！がコンセプト。NPMとも互換性がある。

## レベルアップNode.js第３章メモ
### シングルプロセスとシングルスレッド
Node.jsは単一のプロセスと単一のスレッドだけで複数のリクエストを処理する！

はい、もう意味わからん。

### プロセスって何？
> プロセスとは、処理のことである。情報処理においてプログラムの動作中のインスタンスを意味し、プログラムのコードおよび全ての変数やその他の状態を含む。オペレーティングシステム によっては、プロセスが複数のスレッドで構成される場合があり、命令を同時並行して実行する。(from wiki)


### スレッドって何？
> スレッドとは、CPU利用の単位。プロセスに比べて、プログラムを実行するときのコンテキスト情報が最小で済むので切り替えが速くなる。スレッドは、thread of executionという言葉を省略したものである。 プログラミングの観点からみると、アプリケーションの処理の「実行の脈絡」は1つでないことが多い。(from wiki)

あかん、wikiじゃわからん。
[スレッド (thread)とは｜「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word12453.html)も参考にしよう。

うん、スレッドについてはなんとなーくわかった。

よしこれも読んで参考にしよう
	* [シングルスレッド (single thread)とは｜「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word12454.html)
	* [マルチスレッド (multi thread)とは｜「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word12455.html)

まぁ言ったら、「並行処理」があるか無いかの違いらしい。

### はい、並行処理って何？
もうわからん言葉が出てきすぎ、、、でもがんばれ。
これを読むのだ。なんか題名にすでに「並行」処理　vs「並列」処理って。。。
[【小ネタ】並列処理とは何か？そして並列処理と並行処理の違いとは？ - Qiita](https://qiita.com/4_mio_11/items/7f418ca661d9f5a2a39d)

> 並行処理は*1つのコアで各プロセスを高速に切り替えて１処理ずつ行なっている*と書きましたね。これに比べて並列処理は*実際に複数のコアで同時に処理を行なっていること*を指しています。

んー、シングルスレッドは並行処理（一つのコアが高速で切り替わって処理を行うこと）がない、って感じかな。

### マルチプロセッシングモジュール（MPM）ってなんやねん！
まぁ、単一プロセス、単一スレッドは、なんとなくわかったけど、Node.js以外にもWebサーバー向けのソフトウェアは他にもある。そうApache！

なんか知らんけど、preforkっていうモジュールがUnixではデフォルト設定されていることが多いらしく、そのpreforkが子プロセスをいくつも生成して複数のリクエストを捌くんだと。。。

[マルチプロセッシングモジュール (MPM) - Apache HTTP サーバ バージョン 2.4](https://httpd.apache.org/docs/2.4/ja/mpm.html)

### クラスタリング
Node.jsは基本シングルプロセス・シングルスレッドで、効率的なサーバー稼働を実現するけど、逆にマルチプロセスじゃないから４コアCPUでも１コアCPUしか使えないから残りの３つのCPUコアが遊んでしまうデメリットがあると、*基本的*には！

そこでクラスタリングが登場。

#### pidってなんやねん
例に使われてるコードになんか`pid`って出てきてるよー、わからんよー。

[プロセスID (PID)とは｜「分かりそう」で「分からない」でも「分かった」気になれるIT用語辞典](https://wa3.i-3-i.info/word11040.html)

Process Identifier、略してPID。おけ。わかった。

#### クラスタリングを使わずにマルチプロセス化することもできる
単純にNodeを複数走らせればOK。でも、ポートNoを変えないと、ポート衝突が起きてしまう。

クラスタリングの大きいメリットはポート衝突が無いこと。

マスタープロセス（親プロセス）から複数の子プロセスにForkすることできて、子プロセス等は一つのポートを親プロセスと共有することを許されている！だから複数ポートの管理をclusterモジュールがやってくれるってこと。便利。

#### Node.jsのClusterをセットアップして、処理を並列化・高速化する！！！

> IPCを使っているから、マスターは各ワーカー（多分、子プロセスのこと）にポートハンドルを送るだけ。

あかん、、またよくわからん言葉が出てきた。

* 何、IPCって
[InterProcess Communication](http://e-words.jp/w/IPC.html)の略らしい
> *IPC*とは、コンピュータ上で実行中のプログラムの間でデータをやり取りするための仕組み。あるプログラムから別のプログラムへデータやメッセージを通知したり、データの提供依頼や処理依頼を行ったり、依頼に対する結果を返したりすることができる。

へぇー

* 何、ポートハンドルって

