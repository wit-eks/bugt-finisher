import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/Slider';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BlockIcon from '@material-ui/icons/Block';
import IconButton from '@material-ui/core/IconButton';

import { CheckPoint } from '../models/CheckPoint';
import { CheckPointCoeficient } from '../models/CheckPointCoeficient';
import { RaceResult } from '../models/RaceResult';

//todo some export??
export interface RaceResultEditorProps {
    raceResult: RaceResult;
    onRecipeChanged: (raceResult: RaceResult) => void;
}


const RaceResultEditor: React.SFC<RaceResultEditorProps> = ({ raceResult, onRecipeChanged }) => {
    const mins = {
        [CheckPoint.Ornak]: 2*3600,
        [CheckPoint.Murowaniec]: 4*3600,
        [CheckPoint.Wodogrzmoty]: 6*3600,
        [CheckPoint.Meta]: 7*3600,
    };
    
    const maxs = {
        [CheckPoint.Ornak]: 8*3600,
        [CheckPoint.Murowaniec]: 14*3600,
        [CheckPoint.Wodogrzmoty]: 16*3600,
        [CheckPoint.Meta]: 18*3600,
    };

        
    const steps = {
        [CheckPoint.Ornak]: 5*60,
        [CheckPoint.Murowaniec]: 5*60,
        [CheckPoint.Wodogrzmoty]: 5*60,
        [CheckPoint.Meta]: 5*60,
    };

        
    const isMax = {
        [CheckPoint.Ornak]: () => raceResult.ornak >= maxs[CheckPoint.Ornak],
        [CheckPoint.Murowaniec]:() => raceResult.murowaniec >= maxs[CheckPoint.Murowaniec],
        [CheckPoint.Wodogrzmoty]: () => raceResult.wodogrzmoty >= maxs[CheckPoint.Wodogrzmoty],
        [CheckPoint.Meta]: () => raceResult.meta >= maxs[CheckPoint.Meta],
    };

            
    const isMin = {
        [CheckPoint.Ornak]: () => raceResult.ornak <= mins[CheckPoint.Ornak],
        [CheckPoint.Murowaniec]:() => raceResult.murowaniec <= mins[CheckPoint.Murowaniec],
        [CheckPoint.Wodogrzmoty]: () => raceResult.wodogrzmoty <= mins[CheckPoint.Wodogrzmoty],
        [CheckPoint.Meta]: () => raceResult.meta <= mins[CheckPoint.Meta],
    };



    const calculateAll= {
        [CheckPoint.Ornak]: (val : number, cp: CheckPoint) => {
            if (cp === CheckPoint.Murowaniec) return val * CheckPointCoeficient.Ornak / CheckPointCoeficient.Murowaniec;
            if (cp === CheckPoint.Wodogrzmoty) return val * CheckPointCoeficient.Ornak / CheckPointCoeficient.Wodogrzmoty;
            if (cp === CheckPoint.Meta) return val * CheckPointCoeficient.Ornak;
            return val;},
        [CheckPoint.Murowaniec]:  (val : number, cp: CheckPoint) => {
            if (cp === CheckPoint.Ornak) return val * CheckPointCoeficient.Murowaniec / CheckPointCoeficient.Ornak;
            if (cp === CheckPoint.Wodogrzmoty) return val * CheckPointCoeficient.Murowaniec / CheckPointCoeficient.Wodogrzmoty;
            if (cp === CheckPoint.Meta) return val * CheckPointCoeficient.Murowaniec;
            return val;},

        [CheckPoint.Wodogrzmoty]:  (val : number, cp: CheckPoint) => {
            if (cp === CheckPoint.Ornak) return val * CheckPointCoeficient.Wodogrzmoty / CheckPointCoeficient.Ornak;
            if (cp === CheckPoint.Murowaniec) return val * CheckPointCoeficient.Wodogrzmoty / CheckPointCoeficient.Murowaniec;
            if (cp === CheckPoint.Meta) return val * CheckPointCoeficient.Wodogrzmoty;
            return val;},

        [CheckPoint.Meta]:  (val : number, cp: CheckPoint) => {
            if (cp === CheckPoint.Ornak) return val / CheckPointCoeficient.Ornak;
            if (cp === CheckPoint.Murowaniec) return val / CheckPointCoeficient.Murowaniec;
            if (cp === CheckPoint.Wodogrzmoty) return val / CheckPointCoeficient.Wodogrzmoty;
            return val;}
    };

    const calculateMeta2= {
        [CheckPoint.Ornak]: (val : number) => val * CheckPointCoeficient.Ornak,
        [CheckPoint.Murowaniec]: (val : number) => val * CheckPointCoeficient.Murowaniec,
        [CheckPoint.Wodogrzmoty]: (val : number) => val * CheckPointCoeficient.Wodogrzmoty,
        [CheckPoint.Meta]: (val : number) => val * CheckPointCoeficient.Meta, //:D
    };


    const calculateMeta = {
        [CheckPoint.Ornak]: () => raceResult.ornak * CheckPointCoeficient.Ornak,
        [CheckPoint.Murowaniec]: () => raceResult.murowaniec * CheckPointCoeficient.Murowaniec,
        [CheckPoint.Wodogrzmoty]: () => {
            console.log(raceResult.wodogrzmoty);
            return raceResult.wodogrzmoty * CheckPointCoeficient.Wodogrzmoty;
        },
        [CheckPoint.Meta]: () => raceResult.meta * CheckPointCoeficient.Meta, //:D
    };
    

    const calculateMetaOld = {
        [CheckPoint.Ornak]: () => Math.round((raceResult.ornak * CheckPointCoeficient.Ornak) / steps[CheckPoint.Ornak]) * steps[CheckPoint.Ornak],
        [CheckPoint.Murowaniec]: () => Math.round((raceResult.murowaniec * CheckPointCoeficient.Murowaniec) / steps[CheckPoint.Murowaniec]) * steps[CheckPoint.Murowaniec],
        [CheckPoint.Wodogrzmoty]: () => Math.round((raceResult.wodogrzmoty * CheckPointCoeficient.Wodogrzmoty) / steps[CheckPoint.Wodogrzmoty]) * steps[CheckPoint.Wodogrzmoty],
        [CheckPoint.Meta]: () => Math.round((raceResult.meta * CheckPointCoeficient.Meta) / steps[CheckPoint.Meta]) * steps[CheckPoint.Meta], //:D
    };


    const calculate = {
        [CheckPoint.Ornak]: () => raceResult.meta / CheckPointCoeficient.Ornak,
        [CheckPoint.Murowaniec]: () => raceResult.meta / CheckPointCoeficient.Murowaniec,
        [CheckPoint.Wodogrzmoty]: () => raceResult.meta / CheckPointCoeficient.Wodogrzmoty,
        [CheckPoint.Meta]: () => raceResult.meta / CheckPointCoeficient.Meta, //:D
    };
    const calculateOld = {
        [CheckPoint.Ornak]: () => Math.round((raceResult.meta / CheckPointCoeficient.Ornak) / steps[CheckPoint.Ornak]) * steps[CheckPoint.Ornak],
        [CheckPoint.Murowaniec]: () => Math.round((raceResult.meta / CheckPointCoeficient.Murowaniec) / steps[CheckPoint.Murowaniec]) * steps[CheckPoint.Murowaniec],
        [CheckPoint.Wodogrzmoty]: () => Math.round((raceResult.meta / CheckPointCoeficient.Wodogrzmoty) / steps[CheckPoint.Wodogrzmoty]) * steps[CheckPoint.Wodogrzmoty],
        [CheckPoint.Meta]: () => Math.round((raceResult.meta / CheckPointCoeficient.Meta) / steps[CheckPoint.Meta]) * steps[CheckPoint.Meta], //:D
    };

    const updateRecipe = (item: CheckPoint, value: number) => {
      
        if(isMin[CheckPoint.Meta]() || isMin[CheckPoint.Ornak]() || isMin[CheckPoint.Wodogrzmoty]() || isMin[CheckPoint.Murowaniec]()
        ||isMax[CheckPoint.Meta]() || isMax[CheckPoint.Ornak]() || isMax[CheckPoint.Wodogrzmoty]() || isMax[CheckPoint.Murowaniec]()){
            return;
        }


        const updatedRecipe = { ...raceResult };



        ///*
        updatedRecipe[item] = Math.round(updatedRecipe[item]/steps[item]) * steps[item];

        const val = updatedRecipe[item];
        //console.log(val);
        
        for (const key in updatedRecipe) {
            const keyItem = key as CheckPoint;
           
            if (updatedRecipe.hasOwnProperty(key)) {
                if (key === item) {
                    updatedRecipe[keyItem] = value;}
                    else{

                  updatedRecipe[keyItem] = calculateAll[item](val, keyItem);               
                 }
                }
          }
//*/


/*
        for (const key in updatedRecipe) {
            const keyItem = key as CheckPoint;
            if (updatedRecipe.hasOwnProperty(key)) {
                if (key === item) {
                    updatedRecipe[keyItem] = value;
                } else {
                    updatedRecipe[keyItem] = calculate[keyItem]();
                }
            }
        }//*/

        onRecipeChanged && onRecipeChanged(updatedRecipe);
    };



    const increaseRecipe = (item: CheckPoint) => {
        const updatedRecipe = { ...raceResult };
        if (isMax[item]()) return;
        
        updatedRecipe[item] = Math.round(updatedRecipe[item]/steps[item]) * steps[item];
        updatedRecipe[item] += steps[item];
        const val = updatedRecipe[item];
        //console.log(val);
        
        for (const key in updatedRecipe) {
            const keyItem = key as CheckPoint;
           
            if (updatedRecipe.hasOwnProperty(key)) {
                  updatedRecipe[keyItem] = calculateAll[item](val, keyItem);                
                }
          }
          //console.log(updatedRecipe);

        onRecipeChanged && onRecipeChanged(updatedRecipe);
    };


    const decreaseRecipe = (item: CheckPoint) => {
        const updatedRecipe = { ...raceResult };
       

        if (isMin[item]()) return;

        updatedRecipe[item] = Math.round(updatedRecipe[item]/steps[item]) * steps[item];

        updatedRecipe[item] -= steps[item];
        const val = updatedRecipe[item];
        //console.log(val);
        
        for (const key in updatedRecipe) {
            const keyItem = key as CheckPoint;
           
            if (updatedRecipe.hasOwnProperty(key)) {
                  updatedRecipe[keyItem] = calculateAll[item](val, keyItem);                
                }
          }

        //console.log(updatedRecipe);

        onRecipeChanged && onRecipeChanged(updatedRecipe);
    };

    const toTimeString = (val: number) => {
        var s = new Date(val * 1000).toISOString().substr(11, 8);
        return s;
    };

    const increaseButton = (item: CheckPoint) => (
        <IconButton onClick={() => increaseRecipe(item)} color="primary">
            {isMax[CheckPoint.Meta]() || isMax[CheckPoint.Ornak]() || isMax[CheckPoint.Wodogrzmoty]() || isMax[CheckPoint.Murowaniec]()? <BlockIcon /> : <ArrowForwardIosIcon />}
        </IconButton>
    );

    const decreaseButton = (item: CheckPoint) => (
        <IconButton onClick={() => decreaseRecipe(item)} color="primary">
            {isMin[CheckPoint.Meta]() || isMin[CheckPoint.Ornak]() || isMin[CheckPoint.Wodogrzmoty]() || isMin[CheckPoint.Murowaniec]() ? <BlockIcon /> : <ArrowBackIosIcon />}
        </IconButton>
    );

    return (
        <React.Fragment>
            {/* Coffee */}
            
            <Typography variant="button">Ornak</Typography>
            {decreaseButton(CheckPoint.Ornak)}
            {increaseButton(CheckPoint.Ornak)}
            <Slider
               
                value={raceResult.ornak}
                min={0}
                max={18*3600}
                step={5*60}
                onChange={(_, value) => updateRecipe(CheckPoint.Ornak, value as number)}
                marks={[{ value: raceResult.ornak, label: toTimeString(raceResult.ornak) }]}
            />

            {/* Water */}
            
            <Typography variant="button">Murowaniec</Typography>
            {decreaseButton(CheckPoint.Murowaniec)}
            {increaseButton(CheckPoint.Murowaniec)}
            <Slider
                value={raceResult.murowaniec}
                min={0}
                max={18*3600}
                step={5*60}
                onChange={(_, value) => updateRecipe(CheckPoint.Murowaniec, value as number)}
                marks={[{ value: raceResult.murowaniec, label: toTimeString(raceResult.murowaniec) }]}
            />
            {/* Ratio */}

           
            <Typography variant="button">Wodogrzmoty</Typography>
            {decreaseButton(CheckPoint.Wodogrzmoty)}
            {increaseButton(CheckPoint.Wodogrzmoty)}
            <Slider
                value={raceResult.wodogrzmoty}
                min={0}
                max={18*3600}
                step={5*60}
                onChange={(_, value) => updateRecipe(CheckPoint.Wodogrzmoty, value as number)}
                marks={[{ value: raceResult.wodogrzmoty, label: toTimeString(raceResult.wodogrzmoty)}]}
            />

           {/* Ratio */}

           
           <Typography variant="button">Meta</Typography>
            {decreaseButton(CheckPoint.Meta)}
            {increaseButton(CheckPoint.Meta)}
            <Slider
                value={raceResult.meta}
                min={0}
                max={18*3600}
                step={5*60}
                onChange={(_, value) => updateRecipe(CheckPoint.Meta, value as number)}
                marks={[{ value: raceResult.meta, label: toTimeString(raceResult.meta)}]}
            />

        </React.Fragment>
    );
};

export default RaceResultEditor;
