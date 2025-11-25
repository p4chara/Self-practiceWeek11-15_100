const today = new Date() //dis cur ไม่มีพารา
console.log(today) //2025-11-18T07:00:31.741Z


const now = Date.now() //   ได้ออกมาเป็น milisec ของวันนนั้น
console.log(now) //1763449339624


const nowt =new Date(now) //ใส่พาราเป็น milisec จะได้วันออกมา


//parameter string
const utcDate = new Date("2025-11-18T10:30:00Z");
console.log(utcDate);     // 2025-11-18T10:30:00.000Z
                                                            //แตกต่างกันตรงตัว z ใน string ซึ่ง z คือเวลาสากล อันที่สองคือเวลา local
const localDate = new Date("2025-11-18T10:30:00");
console.log(localDate);   // 2025-11-18T03:30:00.000Z


// date/time parameter
const myDate1 = new Date(2025, 11, 10, 30, 15, 25); //ต้องใส่ monthIndex
console.log(myDate1);   // 2025-12-10T23:15:25.000Z



const startBooking = new Date("2025-11-15T12:00:00");
const stopBooking  = new Date("2025-11-16T12:00:00");

console.log(startBooking === stopBooking)  //false forever, มันจะ compare ตัว ref เพราะเป็น obj
console.log(startBooking.getTime() === stopBooking.getTime())  //ต้อง getTime มาก่อนถึงจะ True

// compare >, <, <=, >= date objects //ไม่ต้อง get มา
console.log(startBooking > stopBooking)   //false
console.log(startBooking < stopBooking)   //true 



 

//dialog confirm
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>Document</title>
//   </head>
//   <body>
//     <button>Test</button>
//     <dialog id="messageDialog">
//       <p>Do you want to confirm your declaration</p>
//       <button id="okBtn">OK</button>
//       <button id="cancelBtn">Cancel</button>
//     </dialog>
//     <script type="module" src="./dialogTest.js"></script>
//   </body>
// </html>


//dialogTest.js
async function displayDialog() {
  return new Promise((resolve) => {
    const dialogMessageEl = document.getElementById("messageDialog")
 
    const okBtnEl = document.getElementById("okBtn")
    const cancelBtnEl = document.getElementById("cancelBtn")
    //click แล้วdialong ปิด
    okBtnEl.addEventListener("click", () => {
      dialogMessageEl.close()
      resolve(okBtnEl.textContent)
    })
    //click แล้วdialong ปิด
    cancelBtnEl.addEventListener("click", () => {
      dialogMessageEl.close()
      resolve(cancelBtnEl.textContent)
    })
    dialogMessageEl.showModal() //showmodal ข้างหลังจะทำอะไรไม่ได้เลย
  })
 
  //   dialogMessageEl.show()
}
 
const ans = await displayDialog()
console.log(ans)

//functionจาก integrated ที่เอาstatus มาโชว์
async function loadDeclaredStatus(studentId) {
  const endpoint = DECLARE_ENDPOINT(studentId);
  console.log("GET:", endpoint);

  try {
    await keycloak.updateToken(30);

    const res = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${keycloak.token}` },
    });

    const raw = await res.text();
    console.log("Raw declared status:", raw);

    // No declared
    if (res.status === 400 || res.status === 404) {
      declareStatus.textContent = "Not declared";
      declareStatus.style.color = "red";
      showDeclareBox(true);
      return;
    }

    if (!res.ok) {
      declareStatus.textContent = "Not declared";
      declareStatus.style.color = "red";
      showDeclareBox(true);
      return;
    }

    const data = JSON.parse(raw);

    // ⭐ backend ส่งแค่ planId → หา detail จาก studyPlans
    const declaredPlanId = data.planId;
    const plan = studyPlans.find((p) => p.id === declaredPlanId);

    if (!plan) {
      declareStatus.textContent = "Declared (Unknown Plan)";
      declareStatus.style.color = "orange";
      showDeclareBox(false);
      return;
    }

    const created = formatCreatedAt(data.createdAt);

    declareStatus.textContent = `Declared ${plan.planCode} - ${plan.nameEng} on ${created} (Asia/Bangkok)`;
    declareStatus.style.color = "green";
    showDeclareBox(false);
  } catch (err) {
    console.error("Declared status error:", err);
    declareStatus.textContent = "Not declared";
    declareStatus.style.color = "red";
    showDeclareBox(true);
  }
}