/* indexDB */

export default class DB {
  private dbName: string // 数据库名称
  private db:any // 数据库对象

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  // 打开indexDB数据库
  public openStore(storeName:string,keyPath:string,indexs?:Array<string>) {
    const request = window.indexedDB.open(this.dbName, 2)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log('数据库打开成功');
        this.db = event.target.result;
        console.log(event);
        resolve(true) // 保证数据传输
      }
  
      request.onerror = (event) => {
        console.log('数据库打开失败');
        console.log(event);
        reject(event)
      }
  
      request.onupgradeneeded = (event) => {
        console.log('数据库升级成功');
        const { result }: any = event.target;
        const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath })
        if (indexs && indexs.length) {
          indexs.map((v: string) => {
            store.createIndex(v, v, { unique: false }) // 新建索引 unique true-不能重复  false-可以重复
          })
        }
        store.transaction.oncomplete = (event: any) => {
          console.log("创建对象仓库成功");
        }
        console.log(event);
      }
    })
    }

  // 新增/修改数据库数据
  updateItem(storeName: string, data: any) {
    console.log('db=>',this.db)
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName) // readwirte-读写
    const request = store.put({
      ...data,
      updateTime: new Date().getTime()
    }) // 兼容新增/修改 - put  新增-add
    return new Promise((resolve, reject) => {
      request.onsuccess = (event:any) => {
        console.log('数据写入成功');
        console.log(event);
        resolve(event)
      }
      request.onerror = (event:any) => {
        console.log('数据写入失败');
        console.log(event);
        reject(event)
      }
    })
  }

  // 新增/修改数据库数据
  deleteItem(storeName: string, key: number | string) {
    console.log('db=>',this.db)
    const store = this.db.transaction([storeName],'readwrite').objectStore(storeName) // readwirte-读写
    const request = store.delete(
      key
    ) // 删除 delete
    return new Promise((resolve, reject) => {
      request.onsuccess = (event:any) => {
        console.log('数据删除成功');
        console.log(event);
        resolve(event)
      }
      request.onerror = (event:any) => {
      console.log('数据删除失败');
        console.log(event);
        reject(event)
    }
  })
  }

  // 查询所有数据
  getList(storeName: string) {
    console.log('db=>',this.db)
    const store = this.db.transaction([storeName]).objectStore(storeName) // readwirte-读写
    const request = store.getAll() // 查询所有数据
    return new Promise((resolve, reject) => {
      request.onsuccess = (event:any) => {
        console.log('查询所有数据成功');
        console.log(event.target.result);
        resolve(event.target.result)
      }
      request.onerror = (event:any) => {
        console.log('查询所有数据失败');
        console.log(event);
        reject(event)
      }
    })
  }

  // 查询单条数据
  getItem(storeName: string,key:number | string) {
    console.log('db=>',this.db)
    const store = this.db.transaction([storeName]).objectStore(storeName) // readwirte-读写
    const request = store.get(key) // 查询单挑数据-get
    return new Promise((resolve, reject) => { 

      request.onsuccess = (event:any) => {
        console.log('查询某一条数据成功');
        console.log(event.target.result);
        resolve(event.target.result)
      }
      request.onerror = (event:any) => {
        console.log('查询某一条数据失败');
        console.log(event);
        reject(event)
      }
    })
  }
}
