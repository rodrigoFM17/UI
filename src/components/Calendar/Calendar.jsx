import { useState } from 'react'
import './Calendar.css'
import { useEffect } from 'react'
import CallendarCell from '../CallendarCell/CallendarCell'
import OrderList from '../OrderList/OrderList'


export default function Calendar () {
    const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
    const [index, setIndex] = useState(new Date().getMonth())
    const date = new Date(2023, index, 1)
    const firstDay = date.getDay()
    const [month, setMonth] = useState(months[index]) 
    const daysMonth = new Date(2023, index + 1, 0).getDate()
    const days = []
    const auxDays = []

    //sucesfulDrag sirve para validar si se realizo correctamente el Drag

    const [sucesfulDrag, setSuccess] = useState(false)

    //order y ordersToDo son peticiones

    const orders = [
        {day: 3, order: 45346, hour: '12-1 PM' },
        {day: 3, order: 48266, hour: '1-2 PM' },
        {day: 8, order: 56749, hour: '2-3 PM'},
        {day: 14, order: 75864, hour: '5-6 PM'},
        {day: 22, order: 25435, hour: '10-11AM'}
     ]

     const ordersToDo = [
        {order: 45346, hour: '12-1 PM' },
        {order: 48266, hour: '1-2 PM' },
        {order: 56749, hour: '2-3 PM'},
        {order: 75864, hour: '5-6 PM'},
        {order: 25435, hour: '10-11AM'}
     ]
        
     //selectOrders sirve para obtener los pedidos de un dia del mes
     const selectOrders = (day) =>{
        const dayOrders = orders.filter(order => order.day === day)
        return dayOrders
     }

    if (firstDay != 0){
        for(let i=0; i< firstDay -1; i++){
            days.push(0)
        }
    } else {
        days.push(0,0,0,0,0,0)
    }

    for ( let i=1; i<= daysMonth; i++){
        days.push(i)
    }

    const nRows = Math.ceil(days.length / 7)
    const rest = nRows * 7 - days.length
    for(let i=0; i < rest; i++ ){
        days.push(0)
    } 
    console.log(nRows)
    console.log(rest)
    console.log(days)

    for(let i=0; i< nRows; i++){
        let arrayAux = days.splice(0,7) 
        auxDays.push(arrayAux)
    }
    
    console.log(auxDays)

    useEffect(()=>{
        setMonth(months[index])
    },[index])

    const increaseMonth = () =>{
        if(index == 11){
            setIndex(0)
        } else{
            setIndex(index + 1)
        }
    }

    const decreaseMonth = () => {
        if(index == 0){
            setIndex(11)
        } else{
            setIndex(index - 1)
        }
    }

    return(
        <section className='containerCalendar'>

            <div>
                <header className='containerMonth'>
                    <button onClick={decreaseMonth}> - </button>
                    <h2>{month}</h2>
                    <button onClick={increaseMonth}>  + </button>
                </header>   
                

                <table>
                    <thead>
                        <tr>
                            <td>Lunes</td>
                            <td>Martes</td>
                            <td>Miercoles</td>
                            <td>Jueves</td>
                            <td>Viernes</td>
                            <td>Sabado</td>
                            <td>Domingo</td>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                auxDays.map(row =>{
                                    return <tr>
                                        {
                                            row.map( day =>{
                                                let dayOrders = []
                                                if(day !== 0){
                                                    dayOrders = selectOrders(day)
                                                    console.log(dayOrders)
                                                }
                                                return <CallendarCell day={day} month={index} year={2023} dayOrders={dayOrders} setSuccess={setSuccess}/>
                                            })
                                        }
                                    </tr>
                                    
                                    
                                })
                                
                            }

                        
                    </tbody>
                </table>

            </div>

            <OrderList monthOrders={orders} sucess={sucesfulDrag} setSuccess={setSuccess}/>
            


        </section>
    )
}