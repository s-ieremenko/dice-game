import React, { useCallback, useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import ReactConfetti from "react-confetti";

import Die from "./Die";

function App() {
    const [dice, setDice] = useState([])
    const [isWon, setIsWon] = useState(false)
    const [opacity, setOpacity] = useState(0)

    const generateNewDie = () => {
        return {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
        }
    }

    const getRandomDice = useCallback(() => {
        const newArr = []
        for (let i = 0; i < 10; i++) {
            newArr.push(generateNewDie())
        }
        console.log(newArr)
        return newArr
    }, [])

    const startGame = () => {
        setDice(getRandomDice())
        setIsWon(false)
        setOpacity(0)
    }

    const rollDice = () => {
        setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()

            })
        )
    }

    const holdDice = (id) => {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    const title = isWon ? 'New Game' : "Roll"


    useEffect(() => {
        if (!dice.length) {
            setDice(getRandomDice())
        } else {
            const allDiceHeld = dice.every(die => die.isHeld)
            const sameValue = dice.every(die => dice[0].value === die.value)
            if (allDiceHeld && sameValue) {
                setIsWon(true)
                setTimeout(() => setOpacity(1), 2000)
            }
        }
    }, [dice, isWon, getRandomDice])


    const randomNumbers = dice.map(die => {
            const { id, value, isHeld } = die
            return <Die key={id} value={value} isHeld={isHeld} holdDice={() => holdDice(id)}/>
        }
    )

    return (
        <main>
            {isWon && (<>
                <p className='win-text' style={{ opacity }}>You won!</p>
                <ReactConfetti/>


            </>)}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current
                value between rolls.</p>
            <div className='dice-container'>
                {randomNumbers}


            </div>
            <button className='roll-dice' onClick={!isWon ? rollDice : startGame}>{title}</button>

        </main>
    )
}

export default App

