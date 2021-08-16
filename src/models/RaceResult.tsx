import { CheckPoint } from './CheckPoint';
import { CheckPointCoeficient } from './CheckPointCoeficient';
export class RaceResult{
    [CheckPoint.Ornak]: number;
    [CheckPoint.Murowaniec]: number;
    [CheckPoint.Wodogrzmoty]: number;
    [CheckPoint.Meta]: number;

    constructor(meta: number) {
        this.ornak = meta / CheckPointCoeficient.Ornak;
        this.murowaniec = meta / CheckPointCoeficient.Murowaniec;
        this.wodogrzmoty = meta / CheckPointCoeficient.Wodogrzmoty;
        this.meta = meta;
       }
}


