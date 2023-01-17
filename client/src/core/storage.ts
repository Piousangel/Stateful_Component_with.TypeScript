/**
 *  Storage 인터페이스 로컬 스토리지 활용(브라우저 닫혀도 저장할 수 있어요!)
 *  제네릭 타입으로 선언하여
 *  ex)
 *  const tempStorage1 = new Storage<string>("storageName1");
 *  const tempStorage2 = new Storage<number>("storageName2");
 *  특정 타입을 제한하지 않고 사용할 수 있도록 했어요.
 */

class storage<T> {
    constructor(
        readonly key: string,
        readonly storage: Storage = localStorage
    ) {}

    public get(): T[] {
        const items = this.storage.getItem(this.key) ?? "[]";
        return JSON.parse(items);
    }

    /**
     *  JSON.stringify를 통해 배열로 변환
     */
    public set(item: T[]): void {
        this.storage.setItem(this.key, JSON.stringify(item));
    }
}

export default storage;
