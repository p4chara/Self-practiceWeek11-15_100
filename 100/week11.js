//synchronous programming ต้องรอถึงจะทำต่อได้
console.log("starting...")
console.log("working#1...")
console.log("ending...")

//asynchronous ฟังชันที่ไม่รอ
console.log("starting...")
setTimeout(() => console.log("working#2..."), 5000)
//setTimeout asynchoronous function
console.log("ending...")


 

function doSomething(hasResource) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (hasResource ? resolve("done") : reject("fail")), 5000)
  })
}
console.log("starting...")
const workStatus = doSomething(false)
console.log("ending...")
//starting...
// ending...
//fail, throw exception 
//มันไม่รอตัวดูซัมติง พอตัวดูวัมติง pending ถึง5นาทีมันก็ขึ้น fail ตามมาทีหลัง ถ้ามัน true มันจะ pending แล้วหายไปเลย




// handle promise – .then().catch()
console.log("starting...")

doSomething(true)  // ทำดูซัมติง
    .then((result) => { // ที่เหลือที่มาอยู่หลัง .then จะไม่ทำงานถ้า do ยังทำงานไม่เสร็จ
        console.log("working...")
        console.log(`work status = ${result}`)
        console.log("ending...")
    })
    .catch((error) => { // catch จะทำง่นถ้า doSomething มี error ถ้าไม่มี มันก็จะ catch จาก .then แทน
        console.log(error) //หลักของ fontend ไม่ควรให้ user เห็น tec.error 
    })



//handle promis - async-await
function doSomething(hasResource) {
  return new Promise((resolve, reject) => {
    setTimeout(() => (hasResource ? resolve("done") : reject("fail")), 5000)
  })
}
//2. async-await
async function working2() {
  console.log("starting...")
  try {     //ใน try จะใส่คำสั่งที่เป็นซีเค้วนและสุ่มเสี่ยง 
    const workStatus = await doSomething(false)
    console.log(workStatus)
    console.log("ending...")
  } catch (error) {
    console.log(error)
  }
}





//หน้าเท่คือ Fetch API
async function getItems(url){ //await ต้องใส่ asyncข้างบน อยู่ลำพังไม่ได้
    try{ 
    const res = await fetch(url)
    const items = await res.json()//json -convert json to js obj.
    }
    catch(e){
        throw new Error(`there is a problem, can't read items`)
          //หลักของ fontend ไม่ควรให้ user เห็น tec.error 
    }
}
export{ getItems }





//VITE_APP_URL=http://localhost:5050 //ตัวแปรเก็บ URL ของ API/backend
//.env.production คือไฟล์ กำหนดค่าตัวแปรสภาพแวดล้อม (environment variables) สำหรับ โหมด production ในโปรเจกต์ที่ใช้ Vite


//func สร้าง dom ของแต่ละquote 
function newQuoteElement(quote) {
  const divEle = document.createElement("div")
  divEle.className = "quote-card"
  divEle.dataset.id = quote.id //ให้ค่า data-id ของ <div> ให้เท่ากับ quote.id

  const pQuoteEle = document.createElement("p")
  pQuoteEle.textContent = quote.content
  divEle.appendChild(pQuoteEle)//ใส่ <p> ที่เก็บเนื้อหาเข้าไปเป็นลูก เอาไปต่อท้ายของ <div class="quote-card">

  const pAuthorEle = document.createElement("p")
  pAuthorEle.className = "author"
  pAuthorEle.textContent = quote.author
  divEle.appendChild(pAuthorEle) //ใส่ <p class="author"> เข้าไปใน <div class="quote-card"> ใต้ <p> ที่เป็นเนื้อหา

  const divButtons = document.createElement("div")
  divButtons.className = "actions"

  const editButton = document.createElement("button")
  editButton.className = "edit"
  editButton.dataset.id = quote.id
  editButton.textContent = "Edit"
  divButtons.appendChild(editButton) //ใส่ปุ่ม Edit เข้าไปใน <div class="actions">

  const deleteButton = document.createElement("button")
  deleteButton.className = "delete"
  deleteButton.dataset.id = quote.id
  deleteButton.textContent = "Delete"
  divButtons.appendChild(deleteButton)//ใส่ปุ่ม Delete เข้าไปใน <div class="actions">

  divEle.appendChild(divButtons)//ใส่ทั้ง container ปุ่ม (<div class="actions">) เข้าไปเป็นลูกของ <div class="quote-card"> — 
  // ให้การ์ดมีปุ่มและชื่อ
  return divEle
}



