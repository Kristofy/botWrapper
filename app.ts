import { ChildProcess, spawn } from 'node:child_process';
import { Queue } from 'queue-typescript';




export enum ErrorCode {
    Success,
    NonZeroExitCode,
    TLE,
    UnexpectedExitOfCode
}

export class Data {
    id: number;
    data?: string;
}

export class Bot {
    id: number;
    error_code: ErrorCode;
    active: boolean;
    process: ChildProcess;
    std_out: Queue<string>;
    std_err: Queue<string>;
    awailable_time: number;

    private static next_bot_id = 0;

    private static readonly starting_awailable_time: number = 1000; // in ms
    private static readonly plus_time_per_round: number = 1000; // in ms


    public constructor(command:string){
        this.id = Bot.next_bot_id++;
        this.active = true;
        this.error_code = ErrorCode.Success;
        this.std_out = new Queue<string>();
        this.std_err = new Queue<string>();
        this.awailable_time = Bot.starting_awailable_time;

        this.process = spawn(command, [], {shell: true});
        this.process.on('error', (err) => {
            this.error_code = ErrorCode.UnexpectedExitOfCode;
        });

        this.process.stdout.on('data', this.processData.bind(this));
        this.process.stderr.on('data', (data) => this.std_err.enqueue(data));

        this.process.on('close', (code) => {
            this.active = false;
        });
        
        this.process.on('exit', (code) => {
            if(code !== 0) { this.error_code = ErrorCode.NonZeroExitCode; }
            this.active = false;
        })

    }

    private processData(data: any) {
        data
            .toString()
            .split('\n')
            .map((s:string) => s.trim())
            .filter((s:string) => s !== '')
            .forEach((s:string) => this.std_out.enqueue(s))
    }

    public send(message:string):Promise<void> {
        if(!this.active) return new Promise(()=>{});

        return new Promise<void>(
            (resolve, reject) => {
                this.process.stdin.write(message + '\n', (err)=>{
                    if(!!err){
                        console.log("error",err)
                        reject(err);
                    }else{
                        resolve();
                    }
                });
                this.process.stdin.emit('drain');
            }
        );
    }
    
    public ask() :Promise<Data> {
        this.awailable_time += Bot.plus_time_per_round;
        if(this.error_code !== ErrorCode.Success){
            return new Promise(resolve => resolve({id: this.id, data: null}));
        }

        return new Promise(async resolve => {
            const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

            while(this.std_out.length === 0 && this.awailable_time > 0 && this.error_code === ErrorCode.Success){
                this.awailable_time -= 30;
                await delay(30);
            }

            if(this.std_out.length > 0){
                resolve({id: this.id, data: this.std_out.dequeue()});
            }else{ // TLE
                this.error_code = ErrorCode.TLE;
                resolve({id: this.id, data: null});
            }
        });
    }

    public debug():void {
        console.log(this.std_out.toArray());
    }

}

export class BotPool {
    private bots: Bot[]
    public constructor(file_names:string[]){
        this.bots = file_names.map(name => new Bot(name)); 
    }

    public sendAll(message:string):Promise<void[]>{
        return Promise.all(this.bots.map(b => b.send(message)));
    }

    public askAll():Promise<Data[]>{
        return Promise.all(this.bots.map(b => b.ask()));
    }
}

async function test(){

    let bp : BotPool = new BotPool(['./a.out', './b.py']);
    let k = await bp.askAll();
    console.log('answer:', k);
    await bp.sendAll("Kristof")
    for(let i = 0; i < 10; i++){
        let a = await bp.askAll();
        console.log(i,'anwser:', a);
    }
} 

try {
test();
    
} catch (error) {
console.log(error)    
}