

//functionที่เอามาจากโปรเจคครับ เป็นfunctionเปลี่ยนปุ่ม
// --------change------------------------
async function changePlan(studentId,planId) {
   const endpoint = DECLARE_ENDPOINT(studentId);
   console.log("PUT:", endpoint, "planId =", planId);
   try{
    await keycloak.updateToken(30);

    const payload = {planId:Number(planId)};
    console.log("Sending change payload", payload);

    const response =  await fetch(endpoint,{
      method:"PUT",
      headers:{
        Authorization: `Bearer ${keycloak.token}`,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(payload)
    });
    const raw = await response.text();
    console.log("Raw declared status:", raw);

    if (response.status === 200){
      const result = raw ? JSON.parse(raw) : {};
      const resPlanId = result.planId ?? planId;
      const plan = studyPlans.find((p) => p.id === resPlanId);
      
      const created = formatCreatedAt(result.updatedAt);
      declareStatus.textContent = `Declared ${plan.planCode} - ${plan.nameEng} on ${created} (Asia/Bangkok)`;
      declareStatus.style.color = "green";

      currentDeclaredPlanId = Number(resPlanId);
      majorSelect.value = String(resPlanId);
      updateChangeButtonState();

      alert("Declaration updated.");
      return;
    }
    if (response.status === 404) {
      alert(`No declared plan found for student with id=${studentId}.`);

      declareStatus.textContent = "Not Declared";
      declareStatus.style.color = "red";

      currentDeclaredPlanId = null;
      majorSelect.value = "";
      updateChangeButtonState();
      return;
    }
   }catch(err){
    console.error("Change plan failed:", err);
    alert("There is a problem. Please try again later.");
   }
  
}



///////////html/////////////

// <!DOCTYPE html>
// <html lang="th">
// <head>
//   <meta charset="utf-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1" />
//   <title>Declare Your Major</title>
//   <link rel="stylesheet" href="src/style2.css" />
//   <!-- <script src="http://bscit.sit.kmutt.ac.th/intproj25/cs2/reserve.html"></script> -->
// </head>
// <body>
//   <header class="topbar">
//   <div class="container topbar-inner">
//     <div class="left-status">
//       <span class="ecors-declared-plan" id="declarestatus">
//         Declaration Status: <strong></strong>
//       </span>
//     </div>
//     <main id="authenticated-content" style="display: none;">
//       <div class="user-info">
//         <span class="ecors-fullname">Welcome,<br><span id="userFullName">...</span></span>
//         <button id="signOutButton" class="ecors-button-signout">Sign Out</button>
//          <a href="./index.html"><button class="btn-back">back</button></a>
//       </div>
//     </main>
//   </div>
//   </header>


//   <main class="container">
//   <div id="declareBox">
//     <section class="card">
//       <h1 class="card-title">Declare Your Major</h1>
//       <label for="major" class="label">Select Major:</label>
//       <div class="declarebox">
//         <select id="major" name="major" class="ecors-dropdown-plan">
//           <option value="">-- Select Major --</option>

//         </select>
//         <div class="buttonBox">
//           <button class="ecors-button-change" disabled style="display:none;">Change</button>
//           <button id="declareBtn" class="ecors-button-declare">Declare</button>
//         </div>
//       </div>
// </div>
//     </section>
//   </main>
//   <div id="ecors-dialog" class="ecors-dialog" style="display:none;">
//   <div class="ecors-dialog-content">
//     <p class="ecors-dialog-message" id="ecors-dialog-message"></p>
//     <button class="ecors-button-dialog" id="ecors-button-dialog">Ok</button>
//   </div>
// </div>



//   <div class="bottom-strip" aria-hidden="true"></div>
//   <script type="module" src="src/reserve.js"></script>
// </body>
// </html>
