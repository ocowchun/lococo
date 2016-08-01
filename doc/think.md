##way1 store in dicManager

##way2 dicManager in store

##way3 dicManager as args for actions
可以明確的知道 action 會觸發 dicManager 的哪些 方法


打開資料夾並讀取 config
呼叫 openDir action,
在action 裡面產生 manager,成功後呼叫 loadManager action
store subscribe loadManager action,and then emit loadFiles
mainWindow receive loadFiles and fire message to render 
render fire clickFile and ipc receive


