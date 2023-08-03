import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

export default function App_test() {

  useEffect(()=>{
    // const mainMenu=querySelectorAll('#menu_list>li')
    // mainMenu[0].style.border='solid 1px red'
  },[])

  const mainMenuList=[
    {index:0, text:'menu1'},
    {index:1, text:'menu2'},
    {index:2, text:'menu3'},
    {index:3, text:'menu4'},
  ]

  const mainMenu=useRef([])

  useEffect(()=>{
    //mainMenu.current[1].style.border='solid 3px red'
    // for(const item of mainMenu.current){
    //   item.style.border='solid 3px red'
    // }
    gsap.to(mainMenu.current[0], {x:1200, duration:1, ease:'power1.out'})
  }, [])

  // mainMenu.current.style.backgroundColor="red"

  // useEffect(() => {
  //   mainMenu.current.forEach((menu, index) => {
  //     if (index === 1) {
  //       menu.style.backgroundColor = 'red';
  //     }
  //   });
  // }, []);

  return (
    <div>
      <h2 style={{font: "bold 1rem 'noto sans kr'", paddingBottom: "10px"}}>Ref로 DOM 컨트롤 배우기</h2>

      <ul id='menu_list'>
        {/* {
          mainMenuList.map((item)=>(
            <li ref={ (el)=> {mainMenu} } >menu1</li>
            ))
        } */}
        
        {
          mainMenuList.map((item) => (
            <li ref={ (el) => { mainMenu.current[item.index]=el} }>{item.text}</li>
          ))
        }

        {/* <li ref={mainMenu} >menu1</li>
        <li ref={mainMenu}>menu2</li>
        <li ref={mainMenu}>menu3</li>
        <li ref={mainMenu}>menu4</li> */}
      </ul>

    </div>
  )
}
