export default class TodoModel {
    constructor(title,completed=false,id=null){
        this.title = title ;
        this.completed=completed;
        this.id=id;
    }
} 