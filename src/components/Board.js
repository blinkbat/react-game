


import React, { useEffect, useState } from 'react';



const Board = () => {

    const gridArr = [];

    for( let y = 0; y < 20; y++ ) {

        const row = [];

        for( let x = 0; x < 20; x++ ) {

            const type = '.';
            row.push({ x, y, type });
        }

        gridArr.push( row );
    }

    const monsters = [];

    for( let i = 0; i < 5; i++ ) {

        monsters.push({ 
            x: Math.floor( ( Math.random() * 19 ) + 1 ),
            y: Math.floor( ( Math.random() * 19 ) + 1 ),
            type: '&'
        });

    };

    monsters.forEach( monster => gridArr[ monster.y ][ monster.x ].type = monster.type );

    const player = { x: 0, y: 0, type: '@' };
    gridArr[0][0].type = player.type;

    const [ grid, setGrid ] = useState( gridArr );



    

    const changeGrid = ( y, x ) => {

        const newGrid = grid.map( item => item );

        newGrid[ player.y ][ player.x ].type = '.';

        player.x += x; player.y += y;

        monsters.forEach( monster => {

            if( monster.y < player.y ) { 

                newGrid[ monster.y ][ monster.x ].type = '.';
                monster.y++; 

            } else if( monster.y > player.y ) { 

                newGrid[ monster.y ][ monster.x ].type = '.';
                monster.y--; 

            } else if( monster. x < player.x ) {

                newGrid[ monster.y ][ monster.x ].type = '.';
                monster.x++; 

            } else if( monster. x > player.x ) {

                newGrid[ monster.y ][ monster.x ].type = '.';
                monster.x--; 

            }

            newGrid[ monster.y ][ monster.x ].type = monster.type;

        });

        newGrid[ player.y ][ player.x ].type = player.type;

        setGrid( newGrid );

    };

    const keyHandler = e => {

        switch( e.key ) {

            case 'ArrowDown': 
                if( player.y < 19 ) { changeGrid( 1, 0 ) };
                break;
            case 'ArrowUp': 
                if( player.y > 0 ) { changeGrid( -1, 0 ) };
                break;
            case 'ArrowRight': 
                if( player.x < 19 ) { changeGrid( 0, 1 ) };
                break;
            case 'ArrowLeft': 
                if( player.x > 0 ) { changeGrid( 0, -1 ) };
                break;

        }

    };

    useEffect(  () => {

        document.addEventListener("keydown", keyHandler, false);
    
        return () => {
            document.removeEventListener("keydown", keyHandler, false);
        };

    }, [] );

    console.log( grid );

    return(
        <div id="board">
            { grid.map( row => 
                <div>{ row.map( cell => {

                    let color = '';

                    switch( cell.type ) {

                        case '@': color = 'gold'; break;
                        case '&': color = 'violet'; break;
                        case '.': color = 'gray'; break;
                    }

                    return cell.x < 19 ? <span style={{ color }}>{ cell.type }</span> : <br /> 
                }) 
                }</div>
            ) }
        </div>
    );

};

export default Board;