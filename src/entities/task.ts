export class Todo
{
    private name: string;

    constructor(name : string)
    {
        this.name = name;
    }

    getName():string
    {
        return this.name;
    }
}
