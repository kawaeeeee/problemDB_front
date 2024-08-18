# 塾の問題を管理するシステムです。
pdf形式の問題をアップロードし、その問題を検索、表示、コピーできます。
問題データベースのCRUD機能があります。
問題は学年、教科、単元、難しさ、タイトルの情報をもっている。



# ホーム画面
メニューバーのホーム、単元の編集、問題の編集をクリックすることで、それぞれの画面に変わる。
<img width="956" alt="problemDBhome" src="https://github.com/user-attachments/assets/0f371e0e-77b1-4e37-bc23-f76f9c2edafa">


# 単元の編集の画面
<img width="957" alt="editproblemhome" src="https://github.com/user-attachments/assets/1563229c-1307-4211-9384-17c4eb9a0308">

# 問題の編集の画面
<img width="957" alt="editproblemhome2" src="https://github.com/user-attachments/assets/fd2fb429-ec85-4ddb-a914-f85cc942bbdd">


# 機能一覧

## 問題一覧表示機能
ホーム画面で、メニューバーの下の学年、教科をクリックするとプルダウンで選択できる。
検索を押すと、条件に適した問題の一覧が表示される。
なにも指定しないで検索だけを押すと、すべての問題一覧が表示される。

<img width="956" alt="problem_list" src="https://github.com/user-attachments/assets/f185f6ff-1d16-4ca0-8611-8a97541e11c2">


## pdfファイル表示機能
"開く"ボタンを押すと、そのpdfがモーダルウィンドウに表示される。
<img width="954" alt="showpdf" src="https://github.com/user-attachments/assets/c94b89c9-2332-46af-b053-8ef36646e581">




## pdfファイル印刷機能
"印刷"ボタンを押すと、モーダルウィンドウが表示され、"印刷する"を選択すると、印刷される。印刷の処理はバックエンドが行う。
<img width="956" alt="printpdf" src="https://github.com/user-attachments/assets/bc199154-bba6-4cb8-8bec-696112d86b27">

## 問題追加機能
問題の編集の画面の"問題を追加"ボタンを押すと、モーダルウィンドウが表示される。
学年、教科、単元、難しさはプルダウンで選択できる。
タイトルとメモはテキストフィールドに入力する。
ファイルを選択をすると、デバイスから、pdfファイルをアップロードできる。
登録を押すと、問題DBに登録される。
<img width="956" alt="addproblem" src="https://github.com/user-attachments/assets/e4ee0546-03ea-4cf6-92ac-1f268eb34fb0">


## 問題編集機能
問題の編集の画面で、検索し、ファイル一覧を表示後、"編集"ボタンを押すと、モーダルウィンドウが表示され、
学年、教科、単元、タイトル、難しさを変更できる。
追加のときと同様に、学年、教科、単元、難しさはプルダウンで選択でき、タイトルはテキストフィールドへの入力である。
<img width="958" alt="editproblem" src="https://github.com/user-attachments/assets/87cd448d-1b04-464a-b6dd-137903ae694d">

## 問題削除機能
問題の編集の画面で、検索し、ファイル一覧を表示後、"削除"ボタンを押すと、モーダルウィンドウが表示され、
問題を削除できる。
<img width="959" alt="deleteproblem" src="https://github.com/user-attachments/assets/77ca4a16-bbdd-4564-80ea-5f4e98fc5686">

## 単元追加機能
単元の編集の画面の"単元の追加"をクリックすると、モーダルウィンドウが表示され、
単元を追加することができる。
学年と教科はプルダウンで選択できる。
単元名はテキストフィールドへの入力である。
単元を追加すると、問題を追加するときや、編集するときのプルダウンの選択肢に反映される。
<img width="958" alt="addunit" src="https://github.com/user-attachments/assets/28af89ce-6dc3-43d5-a0d9-1af91635c479">


## 単元編集機能
単元の編集の画面の"編集"ボタンを押すと単元名の欄がテキストフィールドに変わり、
単元名の編集ができる。テキストフィールド入力後保存を押すと、変更が反映される。
<img width="954" alt="editunit" src="https://github.com/user-attachments/assets/bda2eb4d-8ea0-4fe0-81b0-cfa0bcf7ff4e">


## 単元削除機能
単元の編集の画面の"編集"ボタンを押すとモーダルウィンドウが表示され、単元を削除できる。
削除したい単元が問題に使用されている場合は削除できない。

<img width="961" alt="deleteunit" src="https://github.com/user-attachments/assets/9b882135-f27d-4e39-9ba6-710db5480179">
