async function working2(){//async มีไว้ให้รู้ว่าจะทำงานแบบasynchronous
    console.log('starting...')
    try{
        const workStatus = await doSomething(false)//ดูซัมทิงจะ return Promise ,ส่วนawaitจะหยุดการทำงานชั่วคราวจนกว่าPromiseจะทำเร็จ
        console.log(workStatus)
        console.log("ending...")
    }
    catch(error){
        console.log(error)
    }
}




console.log('starting...')

// เรียกใช้ฟังก์ชัน doSomething(hasResource)
// โดยส่งค่า false -> จำลองกรณีไม่มี resource
doSomething(false)

  // ถ้า Promise สำเร็จ (resolve) จะมาทำใน .then()
  .then((result) => {
      console.log('working...') // แสดงว่ากำลังทำงานต่อหลังจากสำเร็จ
      console.log(`workStatus = ${result}`) // แสดงผลลัพธ์ที่ได้จาก resolve ("done")
      console.log('ending...')
  })

  // ถ้า Promise ล้มเหลว จะมาทำใน .catch()
  .catch((error) => {
      console.log(error) 
  })






document.addEventListener("DOMContentLoaded", async () => {
  const quoteList = document.getElementById("quoteList") // div ที่จะเก็บ quote ทั้งหมด

  try {
    const quotes = await loadQuotes() // ดึงข้อมูล quote ทั้งหมดในarray
    console.log(quotes) // ตรวจ

    // สร้าง elementแสดงquoteทีละอัน แล้วเพิ่มเข้าไปในหน้า
    quotes.forEach((quote) => {
      const divQuoteEle = newQuoteElement(quote) // เรียกฟังก์ชันสร้าง DOM
      quoteList.appendChild(divQuoteEle)
    })
  } catch (e) {
    alert(e.message) 
  }
})