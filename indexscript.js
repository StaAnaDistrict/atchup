let layer1 = document.getElementById('layer1');
let layer2 = document.getElementById('layer2');
let layer3 = document.getElementById('layer3');
let layer4 = document.getElementById('layer4');
let layer5 = document.getElementById('layer5');
let layer6 = document.getElementById('layer6');
let layer7 = document.getElementById('layer7');
let layer8 = document.getElementById('layer8');
let layer9 = document.getElementById('layer9');
let layer10 = document.getElementById('layer10');
let layer11 = document.getElementById('layer11');
let layer12 = document.getElementById('layer12');
let layer13 = document.getElementById('layer13');
let layer14 = document.getElementById('layer14');
let text = document.getElementById('text');


// Set initial styles for all layers
for (let i = 1; i <= 14; i++) {
    let layer = document.getElementById(`layer${i}`);
    if (layer) {
        layer.style.transition = 'opacity 0.5s ease, left 0.5s ease';
    }
}

// Set initial styles for all layers
for (let i = 1; i <= 14; i++) {
    let layer = document.getElementById(`layer${i}`);
    if (layer) {
        layer.style.transition = 'opacity 0.5s ease-out, left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
    }
}

// Set initial styles for layer14
layer14.style.opacity = '0';

window.addEventListener('scroll', () => {
    let value = window.scrollY;
    let windowWidth = window.innerWidth;
    
    for (let i = 2; i <= 14; i++) {
        let layer = document.getElementById(`layer${i}`);
        if (layer) {
            let moveDistance = value * 15;
            let opacity = 1;

            if (i <= 10) {
                layer.style.left = `-${moveDistance}px`;
                opacity = Math.max(0, 1 - (moveDistance / windowWidth));
            } else if (i <= 13) {
                layer.style.left = `${moveDistance}px`;
                opacity = Math.max(0, 1 - (moveDistance / windowWidth));
            } else if (i === 14) {
                // Gradually show layer14 as user scrolls
                opacity = Math.min(value / 100, 1);  // Adjust 100 to control fade-in speed
            }

            layer.style.opacity = opacity;
        }
    }

    // Optional: hide the original text as layer14 appears
    if (text) {
        let opacity = Math.max(0, 1 - value / 100);
        text.style.opacity = opacity;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    checkDatabaseStatus();
    
    const searchInput = document.getElementById('searchInput');
    const privacyCheckbox = document.getElementById('privacyCheckbox');
    const notification = document.getElementById('notification');

    function showNotification(message) {
      notification.textContent = message;
      notification.style.display = 'block';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 3000); // Hide notification after 3 seconds
    }

    function checkPrivacyAgreement() {
      if (!privacyCheckbox.checked) {
        showNotification("Search functions will only run if you check the terms and conditions below.");
        return false;
      }
      return true;
    }

    searchInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (checkPrivacyAgreement()) {
          fetchStudentData();
        }
      }
    });
  });

  async function checkDatabaseStatus() {
      const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1mDQKmYmwCZrtsSg6FE1ascQO5toMKGiwj5xo7-bRXsk/values/%27Learners%27%20Profile%27!A1?key=AIzaSyAC2cZQFW6J70ia1n5yLTGoxIVvu8FH17s';
      const statusElement = document.getElementById('status');

      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          statusElement.textContent = 'Database is active, input name below.';
          statusElement.classList.add('active');
        } else {
          throw new Error('API response was not ok.');
        }
      } catch (error) {
        console.error('Error checking database status:', error);
        statusElement.textContent = 'Database is currently offline';
        statusElement.classList.add('inactive');
      }
    }

    async function fetchStudentData() {
      const searchInput = document.getElementById('searchInput').value;
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = 'Fetching data...';

      try {
        // Fetch data from both sources
        const [profileResponse, scholasticResponse] = await Promise.all([
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/1mDQKmYmwCZrtsSg6FE1ascQO5toMKGiwj5xo7-bRXsk/values/'Learners' Profile'!A4:DH2506?key=AIzaSyAC2cZQFW6J70ia1n5yLTGoxIVvu8FH17s`),
          fetch(`https://sheets.googleapis.com/v4/spreadsheets/1mDQKmYmwCZrtsSg6FE1ascQO5toMKGiwj5xo7-bRXsk/values/'Learners'' Scholastic Record'!A4:AUY?key=AIzaSyAC2cZQFW6J70ia1n5yLTGoxIVvu8FH17s`)
        ]);

        const profileData = await profileResponse.json();
        const scholasticData = await scholasticResponse.json();

        // Filter profile data
        const filteredProfileData = profileData.values.filter(row => row[0].toLowerCase().includes(searchInput.toLowerCase()));
        

        // Filter scholastic data
        const filteredScholasticData = scholasticData.values.filter(row => row[0].toLowerCase().includes(searchInput.toLowerCase()));
        

        if (filteredProfileData.length > 0 && filteredScholasticData.length > 0) {
          const processedProfileData = processData(filteredProfileData[0]);
          const processedScholasticData = processData(filteredScholasticData[0]);
          openResultsWindow(processedProfileData, processedScholasticData, searchInput);
          
          resultsDiv.innerHTML = 'Data fetched successfully. Check the new window for results.';
        } else {
          resultsDiv.innerHTML = 'No matching records found. Please try again.';
        }
      } catch (error) {
        console.error("Error fetching or processing data:", error);
        resultsDiv.innerHTML = 'An error occurred while fetching data. Please try again later.';
      }
    }

    function isEmpty(value) {
      if (typeof value === 'undefined' || value === null) return true;
      const stringValue = String(value).trim().toUpperCase();
      return stringValue === '' || stringValue === '#NA' || stringValue === 'NA' || stringValue === '#N/A' || stringValue === 'N/A' || stringValue === 'ERROR';
    }

    function processData(data) {
      return data.map(value => isEmpty(value) ? '' : value);
    }

    function displayValue(value, maxWidth, isSchoolYear = false) {
      if (isEmpty(value)) {
        return `<span class="empty-value" style="display:inline-block; width:${maxWidth}px; border-bottom:1px solid black;">&nbsp;</span>`;
      }
      const style = isSchoolYear ? 'white-space: nowrap; overflow: visible;' : '';
      return `<span class="value" style="max-width:${maxWidth}px; ${style}">${value}</span>`;
    }

    function displaySignature(value, maxWidth) {
      
      if (isEmpty(value)) {
        return `<span class="empty-signature" style="display:inline-block; width:${maxWidth}px; border-bottom:1px solid black;">&nbsp;</span>`;
      }
      // Check if the value is a valid URL
      if (typeof value === 'string' && value.trim().toLowerCase().startsWith('http')) {
        return `<img src="${value}" alt="Signature" class="signature-image" style="max-width:${maxWidth}px;">`;
      }
      // If it's not a URL, display it as text
      return `<span class="value" style="max-width:${maxWidth}px;">${value}</span>`;
    }

    function getNextGrade(profileData, scholasticData) {


        const gradeFunctions = [
          getGradeData,
          getGradeDataBox2,
          getGradeDataBox3,
          getGradeDataBox4,
          getGradeDataBox5,
          getGradeDataBox6,
          getGradeDataBox7,
          getGradeDataBox8
        ];
      
        let promotedCount = 0;
      
        for (let i = gradeFunctions.length - 1; i >= 0; i--) {
          const boxNumber = i + 1;
          let gradeValue, schoolYearValue;
      
          if (boxNumber === 1) {
            gradeValue = profileData[22];
            schoolYearValue = profileData[20];
          } else {
            gradeValue = profileData[34 + (boxNumber - 2) * 9]; // Adjusted index for grade
            schoolYearValue = profileData[32 + (boxNumber - 2) * 9]; // Adjusted index for school year
          }
      
          
      
          if (gradeValue && schoolYearValue) {
            const result = gradeFunctions[i](22, gradeValue, schoolYearValue, scholasticData, 1);
            
            
            if (result.remarks === "PROMOTED") {
              promotedCount++;
            
            }
          } else {
            
          }
        }
      
        const nextGrade = promotedCount + 1;
        
        return nextGrade;
      }
      function getLastSchoolYear(profileData) {
        // Check boxes 8 to 3 from createBox134
        const boxIndices = [92, 82, 72, 62, 52, 42];
        
        for (let index of boxIndices) {
          const schoolYearValue = profileData[index];
          if (schoolYearValue && schoolYearValue.trim() !== "") {
            
            return schoolYearValue;
          }
        }
      
        // If no school year found in boxes 8 to 3, check Box 2
        const box2SchoolYear = profileData[32];
        if (box2SchoolYear && box2SchoolYear.trim() !== "") {
          
          return box2SchoolYear;
        }
      
        // If Box 2 is also empty, use Box 1
        const box1SchoolYear = profileData[20];
        
        return box1SchoolYear || "";
      }
      
      
            function getRow7Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (grade === 1 && schoolYearStart > 2023) {
                return "Language";
              } else if (grade > 1 && schoolYearStart > 2023) {
                return "Filipino";
              } else {
                return "Mother Tongue";
              }
            }
      
            function getRow8Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (grade === 1 && schoolYearStart > 2023) {
                return "Reading and Literacy";
              } else if (grade > 1 && schoolYearStart > 2023) {
                return "English";
              } else {
                return "Filipino";
              }
            }
      
            function getRow9Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (grade < 7 && schoolYearStart > 2023) {
                return "Mathematics";
              } else {
                return "English";
              }
            }
      
            function getRow10Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  return "Makabansa";
                } else if (grade >= 4) {
                  return "Araling Panlipunan";
                }
              }
              return "Mathematics";
            }
      
            function getRow11Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (grade < 7 && schoolYearStart > 2023) {
                return "GMRC";
              } else {
                return "Science";
              }
            }
      
            function getRow12Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (grade < 3 && schoolYearStart > 2023) {
                return "English"; // Empty string for grades 1-2 after 2023
              } else if (schoolYearStart > 2023 && grade < 7) {
                return "Science";
              } else {
                return "Araling Panlipunan";
              }
            }
      
            function getRow13Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023 && grade < 4) {
                return ""; // Empty string for grades 1-3 after 2023
              } else {
                return "EPP / TLE";
              }
            }
      
            function getRow14Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023 && grade < 4) {
                return ""; // Empty string for grades 1-3 after 2023
              } else {
                return "MAPEH";
              }
            }
      
            function getRow15Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  return ""; // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  return "&nbsp;&nbsp;&nbsp;&nbsp;Music and Arts"; // Four non-breaking spaces before "Music and Arts" for grades 4 and above after 2023
                }
              }
              return "&nbsp;&nbsp;&nbsp;&nbsp;Music"; // Four non-breaking spaces before "Music" for all other cases
            }
      
            function getRow16Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  return ""; // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  return "&nbsp;&nbsp;&nbsp;&nbsp;Physical Education and Health"; // Four non-breaking spaces before "Physical Education and Health" for grades 4 and above after 2023
                }
              }
              return "&nbsp;&nbsp;&nbsp;&nbsp;Arts"; // Four non-breaking spaces before "Arts" for all other cases
            }
      
            function getRow17Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023 && grade < 7) {
                return ""; // Empty string for grades 1-6 after 2023
              } else {
                return "&nbsp;&nbsp;&nbsp;&nbsp;Physical Education"; // Four non-breaking spaces before "Physical Education" for all other cases
              }
            }
      
            function getRow18Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023 && grade < 7) {
                return ""; // Empty string for grades 1-6 after 2023
              } else {
                return "&nbsp;&nbsp;&nbsp;&nbsp;Health"; // Four non-breaking spaces before "Health" for all other cases
              }
            }
      
            function getRow19Column1Text(gradeValue, schoolYearValue) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (schoolYearStart > 2023 && grade < 7) {
                return ""; // Empty string for grades 1-6 after 2023
              } else {
                return "Eduk. sa Pagpapakatao"; // No leading spaces for this text
              }
            }
      
            function getRow20Column1Text() {
              return "&nbsp;&nbsp;&nbsp;&nbsp;*Arabic Language";
            }
      
            function getRow21Column1Text() {
              return "&nbsp;&nbsp;&nbsp;&nbsp;*Islamic Values Education";
            }
      
        function createBox134(profileData, scholasticData, boxNumber) {
        const isBox1 = boxNumber === 1;
        const isBox3 = boxNumber === 3;
        const isBox4 = boxNumber === 4;
        const isBox5 = boxNumber === 5;
        const isBox6 = boxNumber === 6;
        const isBox7 = boxNumber === 7;
        const isBox8 = boxNumber === 8;
      
      
        let gradeValue, schoolYearValue, schoolValue, schoolIdValue, districtValue, divisionValue, regionValue, sectionValue, adviserValue, signatureValue;
      
        if (isBox1) {
          gradeValue = profileData[22];
          schoolYearValue = profileData[20];
          schoolValue = profileData[30];
          schoolIdValue = profileData[29];
          districtValue = profileData[28];
          divisionValue = profileData[25];
          regionValue = profileData[24];
          sectionValue = profileData[23];
          adviserValue = profileData[21];
          signatureValue = profileData[102];
        } else if (isBox3) {
          gradeValue = profileData[44];
          schoolYearValue = profileData[42];
          schoolValue = profileData[50];
          schoolIdValue = profileData[49];
          districtValue = profileData[48];
          divisionValue = profileData[47];
          regionValue = profileData[46];
          sectionValue = profileData[45];
          adviserValue = profileData[43];
          signatureValue = profileData[104];
        } else if (isBox4) {
          gradeValue = profileData[54];
          schoolYearValue = profileData[52];
          schoolValue = profileData[60];
          schoolIdValue = profileData[59];
          districtValue = profileData[58];
          divisionValue = profileData[57];
          regionValue = profileData[56];
          sectionValue = profileData[55];
          adviserValue = profileData[53];
          signatureValue = profileData[105];
        } else if (isBox5) {
          gradeValue = profileData[64];
          schoolYearValue = profileData[62];
          schoolValue = profileData[70];
          schoolIdValue = profileData[69];
          districtValue = profileData[68];
          divisionValue = profileData[67];
          regionValue = profileData[66];
          sectionValue = profileData[65];
          adviserValue = profileData[63];
          signatureValue = profileData[106];
        } else if (isBox6) {
          gradeValue = profileData[74];
          schoolYearValue = profileData[72];
          schoolValue = profileData[80];
          schoolIdValue = profileData[79];
          districtValue = profileData[78];
          divisionValue = profileData[77];
          regionValue = profileData[76];
          sectionValue = profileData[75];
          adviserValue = profileData[73];
          signatureValue = profileData[107];
        } else if (isBox7) {
          schoolYearValue = profileData[82]; // Column CA
          adviserValue = profileData[83];    // Column CB
          gradeValue = profileData[84];      // Column CC
          sectionValue = profileData[85];    // Column CD
          regionValue = profileData[86];     // Column CE
          divisionValue = profileData[87];   // Column CF
          districtValue = profileData[88];   // Column CG
          schoolIdValue = profileData[89];   // Column CH
          schoolValue = profileData[90];     // Column CI
          signatureValue = profileData[108]; // Column CY
        } else if (isBox8) {
          schoolYearValue = profileData[92]; // Column CA
          adviserValue = profileData[93];    // Column CB
          gradeValue = profileData[94];      // Column CC
          sectionValue = profileData[95];    // Column CD
          regionValue = profileData[96];     // Column CE
          divisionValue = profileData[97];   // Column CF
          districtValue = profileData[98];   // Column CG
          schoolIdValue = profileData[99];   // Column CH
          schoolValue = profileData[100];     // Column CI
          signatureValue = profileData[109]; // Column CY
        }
      
        let gradesSection = `
          <!-- Grades Section Header (Rows 5 and 6) -->
          <tr class="grades-header-row">
            <td colspan="9" rowspan="2" class="grades-area-label">LEARNING AREAS</td>
            <td colspan="4" class="grades-quarter-label">Quarterly Rating</td>
            <td colspan="3" rowspan="2" class="grades-final-label">Final<br>Rating</td>
            <td colspan="3" rowspan="2" class="grades-remarks-label">Remarks</td>
          </tr>
          <tr class="grades-header-row">
            <td class="grades-quarter-num">1</td>
            <td class="grades-quarter-num">2</td>
            <td class="grades-quarter-num">3</td>
            <td class="grades-quarter-num">4</td>
          </tr>
        `;
      
        // Add rows 7 to 22 with merged cells in the first column
        for (let i = 7; i <= 22; i++) {
          let subjectText = getSubjectText(i, gradeValue, schoolYearValue);
          let cellClass = 'subject-cell';
          
          if ((i >= 7 && i <= 14) || i === 19 || i === 22) {
            cellClass += ' subject-cell-bold';
          } else if ((i >= 15 && i <= 18) || i === 20 || i === 21) {
            cellClass += ' subject-cell-italic';
          }
      
          let gradeData;
          if (isBox3) {
            gradeData = getGradeDataBox3(i, gradeValue, schoolYearValue, scholasticData);
          } else if (isBox4) {
            gradeData = getGradeDataBox4(i, gradeValue, schoolYearValue, scholasticData);
          } else if (isBox5) {
            gradeData = getGradeDataBox5(i, gradeValue, schoolYearValue, scholasticData);
          } else if (isBox6) {
            gradeData = getGradeDataBox6(i, gradeValue, schoolYearValue, scholasticData);
          } else if (isBox7) {
            gradeData = getGradeDataBox7(i, gradeValue, schoolYearValue, scholasticData);
          } else if (isBox8) {
            gradeData = getGradeDataBox8(i, gradeValue, schoolYearValue, scholasticData);
          } else {
            gradeData = getGradeData(i, gradeValue, schoolYearValue, scholasticData, boxNumber);
          }
      
          gradesSection += `
            <tr class="grades-data-row">
              <td colspan="9" class="${cellClass}" style="white-space: pre-wrap;">${subjectText}</td>
              <td class="grade-cell">${gradeData.q1}</td>
              <td class="grade-cell">${gradeData.q2}</td>
              <td class="grade-cell">${gradeData.q3}</td>
              <td class="grade-cell">${gradeData.q4}</td>
              <td colspan="3" class="final-grade-cell">${gradeData.final}</td>
              <td colspan="3" class="remarks-cell">${gradeData.remarks}</td>
            </tr>
          `;
        }
      
        return `
          <table class="box">
            <tr>
              <td colspan="14">
                <span class="label" id="box${boxNumber}-school-label">School:</span>
                ${displayValue(schoolValue, 180)}
              </td>
              <td colspan="5" class="school-id-container">
                <span class="label" id="box${boxNumber}-school-id-label">School ID:</span>
                ${displayValue(schoolIdValue, 35)}
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <span class="label" id="box${boxNumber}-district-label">District:</span>
                ${displayValue(districtValue, 95)}
              </td>
              <td colspan="8">
                <span class="label" id="box${boxNumber}-division-label">Division:</span>
                ${displayValue(divisionValue, 97)}
              </td>
              <td colspan="3" class="region-container">
                <span class="label" id="box${boxNumber}-region-label">Region:</span>
                ${displayValue(regionValue, 15)}
              </td>
            </tr>
            <tr>
              <td colspan="6" style="width: 31.5%;">
                <span class="label" id="box${boxNumber}-grade-label">Classified as Grade:</span>
                ${displayValue(gradeValue, 56)}
              </td>
              <td colspan="8" style="width: 42%;">
                <span class="label" id="box${boxNumber}-section-label">Section:</span>
                ${displayValue(sectionValue, 70)}
              </td>
              <td colspan="5" style="width: 26.5%;" class="school-year-container">
                <span class="label" id="box${boxNumber}-school-year-label">School Year:</span>
                ${displayValue(schoolYearValue, 42, true)}
              </td>
            </tr>
            <tr>
              <td colspan="13">
                <span class="label" id="box${boxNumber}-adviser-label">Name of Adviser/Teacher:</span>
                ${displayValue(adviserValue, 150)}
              </td>
              <td colspan="2">
                <span class="label" id="box${boxNumber}-signature-label">Signature:</span>
              </td>
              <td colspan="4">
                ${displaySignature(signatureValue, 100)}
              </td>
            </tr>
            ${gradesSection}
          </table>
        `;
      }
      
            function createRemedialTable() {
              let tableHTML = '<table class="remedial-table">';
              
              // Row 1 with merged cells and specified content
              tableHTML += `
                <tr>
                  <td colspan="4" class="remedial-header">Remedial Classes</td>
                  <td colspan="4" class="remedial-header">Conducted from</td>
                  <td colspan="5"></td>
                  <td class="remedial-header">to:</td>
                  <td colspan="5"></td>
                </tr>
              `;
      
              // Row 2 and 3 (merged)
              tableHTML += `
                <tr>
                  <td colspan="5" rowspan="2" class="remedial-subheader">Learning Areas</td>
                  <td colspan="3" rowspan="2" class="remedial-subheader">Final Rating</td>
                  <td colspan="4" rowspan="2" class="remedial-subheader">Remedial Class Mark</td>
                  <td colspan="5" rowspan="2" class="remedial-subheader">Recomputed Final Grade</td>
                  <td colspan="2" rowspan="2" class="remedial-subheader">Remarks</td>
                </tr>
                <tr></tr>
              `;
      
              // Rows 4 and 5 (modified)
              for (let i = 0; i < 2; i++) {
                tableHTML += `
                  <tr>
                    <td colspan="5"></td>
                    <td colspan="3"></td>
                    <td colspan="4"></td>
                    <td colspan="5"></td>
                    <td colspan="2"></td>
                  </tr>
                `;
              }
      
              tableHTML += '</table>';
              return tableHTML;
            }
      
            function createBox34(data, boxNumber) {
              const isBox3 = boxNumber === 3;
              const gradeValue = isBox3 ? data[44] : data[54]; // AS for Box 3, BB for Box 4
              const schoolYearValue = isBox3 ? data[42] : data[52]; // AQ for Box 3, AZ for Box 4
      
              let gradesSection = `
                <!-- Grades Section Header (Rows 5 and 6) -->
                <tr class="grades-header-row">
                  <td colspan="9" rowspan="2" class="grades-area-label">LEARNING AREAS</td>
                  <td colspan="4" class="grades-quarter-label">Quarterly Rating</td>
                  <td colspan="3" rowspan="2" class="grades-final-label">Final<br>Rating</td>
                  <td colspan="3" rowspan="2" class="grades-remarks-label">Remarks</td>
                </tr>
                <tr class="grades-header-row">
                  <td class="grades-quarter-num">1</td>
                  <td class="grades-quarter-num">2</td>
                  <td class="grades-quarter-num">3</td>
                  <td class="grades-quarter-num">4</td>
                </tr>
              `;
      
              // Add rows 7 to 22 with merged cells in the first column
              for (let i = 7; i <= 22; i++) {
                let subjectText = '';
                let cellClass = 'subject-cell';
                
                if ((i >= 7 && i <= 14) || i === 19 || i === 22) {
                  cellClass += ' subject-cell-bold';
                } else if ((i >= 15 && i <= 18) || i === 20 || i === 21) {
                  cellClass += ' subject-cell-italic';
                }
      
                subjectText = getSubjectText(i, gradeValue, schoolYearValue, boxNumber);
      
                gradesSection += `
                  <tr class="grades-data-row">
                    <td colspan="9" class="${cellClass}" style="white-space: pre-wrap;">${subjectText}</td>
                    <td class="grade-cell"></td>
                    <td class="grade-cell"></td>
                    <td class="grade-cell"></td>
                    <td class="grade-cell"></td>
                    <td colspan="3" class="final-grade-cell"></td>
                    <td colspan="3" class="remarks-cell"></td>
                  </tr>
                `;
              }
      
              return `
                <table class="box">
                  <tr>
                    <td colspan="14">
                      <span class="label" id="box${boxNumber}-school-label">School:</span>
                      ${displayValue(isBox3 ? data[50] : data[59], 180)} <!-- AY for Box 3, BH for Box 4 -->
                    </td>
                    <td colspan="5" class="school-id-container">
                      <span class="label" id="box${boxNumber}-school-id-label">School ID:</span>
                      ${displayValue(isBox3 ? data[49] : data[58], 35)} <!-- AX for Box 3, BG for Box 4 -->
                    </td>
                  </tr>
                  <tr>
                    <td colspan="8">
                      <span class="label" id="box${boxNumber}-district-label">District:</span>
                      ${displayValue(isBox3 ? data[48] : data[57], 95)} <!-- AW for Box 3, BF for Box 4 -->
                    </td>
                    <td colspan="8">
                      <span class="label" id="box${boxNumber}-division-label">Division:</span>
                      ${displayValue(isBox3 ? data[47] : data[56], 97)} <!-- AV for Box 3, BE for Box 4 -->
                    </td>
                    <td colspan="3" class="region-container">
                      <span class="label" id="box${boxNumber}-region-label">Region:</span>
                      ${displayValue(isBox3 ? data[46] : data[55], 15)} <!-- AU for Box 3, BD for Box 4 -->
                    </td>
                  </tr>
                  <tr>
                    <td colspan="6" style="width: 31.5%;">
                      <span class="label" id="box${boxNumber}-grade-label">Classified as Grade:</span>
                      ${displayValue(gradeValue, 56)}
                    </td>
                    <td colspan="8" style="width: 42%;">
                      <span class="label" id="box${boxNumber}-section-label">Section:</span>
                      ${displayValue(isBox3 ? data[45] : data[54], 70)} <!-- AT for Box 3, BC for Box 4 -->
                    </td>
                    <td colspan="5" style="width: 26.5%;" class="school-year-container">
                      <span class="label" id="box${boxNumber}-school-year-label">School Year:</span>
                      ${displayValue(schoolYearValue, 42, true)}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="13">
                      <span class="label" id="box${boxNumber}-adviser-label">Name of Adviser/Teacher:</span>
                      ${displayValue(isBox3 ? data[43] : data[53], 150)} <!-- AR for Box 3, BA for Box 4 -->
                    </td>
                    <td colspan="2">
                      <span class="label" id="box${boxNumber}-signature-label">Signature:</span>
                    </td>
                    <td colspan="4">
                      ${displaySignature(isBox3 ? data[98] : data[99], 100)} <!-- CU for Box 3, CV for Box 4 -->
                    </td>
                  </tr>
                  ${gradesSection}
                </table>
              `;
            }
      
            function getSubjectText(rowNumber, gradeValue, schoolYearValue, boxNumber) {
              // Extract the first four characters of the school year and convert to a number
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              
              // Convert grade to a number (in case it's stored as a string)
              const grade = parseInt(gradeValue, 10);
      
              if (rowNumber === 7) {
                if (grade === 1 && schoolYearStart >= 2024) {
                  return "Language";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "Filipino";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return "Filipino";
                } else if (grade === 4 && schoolYearStart >= 2024) {
                  return "Filipino";
                } else {
                  return "Mother Tongue";
                }
              } else if (rowNumber === 8) {
                if (grade === 1 && schoolYearStart >= 2024) {
                  return "Reading and Literacy";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "English";
                } else if (grade === 3 && schoolYearStart >=2026) {
                  return "English";
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "English";
                } else {
                  return "Filipino";
                }
              
              } else if (rowNumber === 9) {
                if (grade === 1 && schoolYearStart >= 2024) {
                  return "Mathematics";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "Mathematics";
                } else if (grade === 3 && schoolYearStart >=2026) {
                  return "Mathematics";
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "Mathematics";
                } else { 
                  return "English";
                }
              
              } else if (rowNumber === 10) {
                if (grade === 1 && schoolYearStart > 2023) {
                    return "Makabansa";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "Makabansa";
                } else if (grade === 3 && schoolYearStart >=2026) {
                  return "Makabansa";
                } else if (grade === 4 && schoolYearStart >=2024) {
                    return "Araling Panlipunan";
                } else if (grade === 5 && schoolYearStart >=2025) {
                    return "Araling Panlipunan";
                } else if (grade === 6 && schoolYearStart >=2026) {
                    return "Araling Panlipunan";
                } else {
                return "Mathematics";
                }
      
              } else if (rowNumber === 11) {
                if (grade === 1 && schoolYearStart > 2023) {
                    return "GMRC";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "GMRC";
                } else if (grade === 3 && schoolYearStart >=2026) {
                  return "GMRC";
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "GMRC";
                } else {
                  return "Science"
                }
              } else if (rowNumber === 12) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "English";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "Science";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return "Science"; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "Science";
                } else {
                  return "Araling Panlipunan";
                }
              } else if (rowNumber === 13) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "EPP / TLE";
                } else {
                  return "EPP / TLE";
                }
              
              } else if (rowNumber === 14) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "MAPEH";
                } else {
                  return "MAPEH";
                }
             
              } else if (rowNumber === 15) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                    return "&nbsp;&nbsp;&nbsp;&nbsp;Music and Arts"; // Four non-breaking spaces before "Music and Arts" for grades 4 and above after 2023
                } else {
                return "&nbsp;&nbsp;&nbsp;&nbsp;Music";
                }
      
              } else if (rowNumber === 16) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                    return "&nbsp;&nbsp;&nbsp;&nbsp;Physical Education and Health"; // Four non-breaking spaces before "Physical Education and Health" for grades 4 and above after 2023
                } else {
                  return "&nbsp;&nbsp;&nbsp;&nbsp;Arts"; // Four non-breaking spaces before "Arts" for all other cases
                }
                
              } else if (rowNumber === 17) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "";
                } else {
                  return "&nbsp;&nbsp;&nbsp;&nbsp;Physical Education"; // Four non-breaking spaces before "Physical Education" for all other cases
                }
      
              } else if (rowNumber === 18) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "";
                } else {
                  return "&nbsp;&nbsp;&nbsp;&nbsp;Health"; // Four non-breaking spaces before "Health" for all other cases
                }
              
              } else if (rowNumber === 19) {
                if (grade === 1 && schoolYearStart > 2023) {
                  return "";
                } else if (grade === 2 && schoolYearStart >= 2025) {
                  return "";
                } else if (grade === 3 && schoolYearStart >= 2026) {
                  return ""; 
                } else if (grade === 4 && schoolYearStart >=2024) {
                  return "";
                } else {
                  return "Eduk. sa Pagpapakatao"; // No leading spaces for this text
                }
              } else if (rowNumber === 20) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;*Arabic Language";
              } else if (rowNumber === 21) {
                return "&nbsp;&nbsp;&nbsp;&nbsp;*Islamic Values Education";
              } else if (rowNumber === 22) {
                return "General Average";
              }
            }
      
            function createRemedialTable34(boxNumber) {
              return `
                <table class="remedial-table">
                  <tr>
                    <td colspan="4" class="remedial-header">Remedial Classes</td>
                    <td colspan="4" class="remedial-header">Conducted from</td>
                    <td colspan="5"></td>
                    <td class="remedial-header">to:</td>
                    <td colspan="5"></td>
                  </tr>
                  <tr>
                    <td colspan="5" rowspan="2" class="remedial-subheader">Learning Areas</td>
                    <td colspan="3" rowspan="2" class="remedial-subheader">Final Rating</td>
                    <td colspan="4" rowspan="2" class="remedial-subheader">Remedial Class Mark</td>
                    <td colspan="5" rowspan="2" class="remedial-subheader">Recomputed Final Grade</td>
                    <td colspan="2" rowspan="2" class="remedial-subheader">Remarks</td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td colspan="5"></td>
                    <td colspan="3"></td>
                    <td colspan="4"></td>
                    <td colspan="5"></td>
                    <td colspan="2"></td>
                  </tr>
                  <tr>
                    <td colspan="5"></td>
                    <td colspan="3"></td>
                    <td colspan="4"></td>
                    <td colspan="5"></td>
                    <td colspan="2"></td>
                  </tr>
                </table>
              `;
            }
      
            function createRemedialTable345(boxNumber) {
        return `
          <div class="remedial-tables-${boxNumber}">
            <table class="remedial-table">
              <tr>
                <td colspan="4" class="remedial-header">Remedial Classes</td>
                <td colspan="4" class="remedial-header">Conducted from</td>
                <td colspan="5"></td>
                <td class="remedial-header">to:</td>
                <td colspan="5"></td>
              </tr>
              <tr>
                <td colspan="5" rowspan="2" class="remedial-subheader">Learning Areas</td>
                <td colspan="3" rowspan="2" class="remedial-subheader">Final Rating</td>
                <td colspan="4" rowspan="2" class="remedial-subheader">Remedial Class Mark</td>
                <td colspan="5" rowspan="2" class="remedial-subheader">Recomputed Final Grade</td>
                <td colspan="2" rowspan="2" class="remedial-subheader">Remarks</td>
              </tr>
              <tr></tr>
              <tr>
                <td colspan="5"></td>
                <td colspan="3"></td>
                <td colspan="4"></td>
                <td colspan="5"></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td colspan="3"></td>
                <td colspan="4"></td>
                <td colspan="5"></td>
                <td colspan="2"></td>
              </tr>
            </table>
          </div>
        `;
      }
      
      function getGradeData(rowNumber, gradeValue, schoolYearValue, scholasticData, boxNumber) {
        if (boxNumber !== 1) {
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
      
        // Helper function to replace undefined or empty values with an empty string
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        switch (rowNumber) {
                case 7:
                  if (grade === 1 && schoolYearStart > 2023) {
                    q1 = scholasticData[22]; // Column W
                    q2 = scholasticData[44]; // Column AS
                    q3 = scholasticData[66]; // Column BO
                    q4 = scholasticData[88]; // Column CK
                    final = scholasticData[110]; // Column DG
                  } else if (grade > 1 && schoolYearStart > 2023) {
                    q1 = scholasticData[8]; // Column I
                    q2 = scholasticData[30]; // Column AE
                    q3 = scholasticData[52]; // Column BA
                    q4 = scholasticData[74]; // Column BW
                    final = scholasticData[96]; // Column CS
                  } else {
                    q1 = scholasticData[7]; // Column H
                    q2 = scholasticData[29]; // Column AD
                    q3 = scholasticData[51]; // Column AZ
                    q4 = scholasticData[73]; // Column BV
                    final = scholasticData[95]; // Column CR
                  }
                  break;
                case 8:
                  if (grade === 1 && schoolYearStart > 2023) {
                    q1 = scholasticData[23]; // Column X
                    q2 = scholasticData[45]; // Column AT
                    q3 = scholasticData[67]; // Column BP
                    q4 = scholasticData[89]; // Column CL
                    final = scholasticData[111]; // Column DH
                  } else if (grade > 1 && schoolYearStart > 2023) {
                    q1 = scholasticData[9]; // Column J
                    q2 = scholasticData[31]; // Column AF
                    q3 = scholasticData[53]; // Column BB
                    q4 = scholasticData[75]; // Column BX
                    final = scholasticData[97]; // Column CT
                  } else {
                    q1 = scholasticData[8]; // Column I
                    q2 = scholasticData[30]; // Column AE
                    q3 = scholasticData[52]; // Column BA
                    q4 = scholasticData[74]; // Column BW
                    final = scholasticData[96]; // Column CS
                  }
                  break;
                case 9:
                  if (grade < 7 && schoolYearStart > 2023) {
                    q1 = scholasticData[10]; // Column K
                    q2 = scholasticData[32]; // Column AG
                    q3 = scholasticData[54]; // Column BC
                    q4 = scholasticData[76]; // Column BY
                    final = scholasticData[98]; // Column CU
                  } else {
                    q1 = scholasticData[9]; // Column J
                    q2 = scholasticData[31]; // Column AF
                    q3 = scholasticData[53]; // Column BB
                    q4 = scholasticData[75]; // Column BX
                    final = scholasticData[97]; // Column CT
                  }
                  break;
                case 10:
                  if (schoolYearStart > 2023) {
                    if (grade < 4) {
                      q1 = scholasticData[6]; // Column G
                      q2 = scholasticData[28]; // Column AC
                      q3 = scholasticData[50]; // Column AY
                      q4 = scholasticData[72]; // Column BU
                      final = scholasticData[94]; // Column CQ
                    } else if (grade >= 4) {
                      q1 = scholasticData[12]; // Column M
                      q2 = scholasticData[34]; // Column AI
                      q3 = scholasticData[56]; // Column BE
                      q4 = scholasticData[78]; // Column CA
                      final = scholasticData[100]; // Column CW
                    }
                  } else {
                    q1 = scholasticData[10]; // Column K
                    q2 = scholasticData[32]; // Column AG
                    q3 = scholasticData[54]; // Column BC
                    q4 = scholasticData[76]; // Column BY
                    final = scholasticData[98]; // Column CU
                  }
                  break;
                case 11:
                  if (grade < 7 && schoolYearStart > 2023) {
                    q1 = scholasticData[5]; // Column F
                    q2 = scholasticData[27]; // Column AB
                    q3 = scholasticData[49]; // Column AX
                    q4 = scholasticData[71]; // Column BT
                    final = scholasticData[93]; // Column CP
                  } else {
                    q1 = scholasticData[11]; // Column L
                    q2 = scholasticData[33]; // Column AH
                    q3 = scholasticData[55]; // Column BD
                    q4 = scholasticData[77]; // Column BZ
                    final = scholasticData[99]; // Column CV
                  }
                  break;
                case 12:
                  if (grade < 3 && schoolYearStart > 2023) {
                    q1 = scholasticData[9]; // Column J
                    q2 = scholasticData[31]; // Column AF
                    q3 = scholasticData[53]; // Column BB
                    q4 = scholasticData[75]; // Column BX
                    final = scholasticData[97]; // Column CT
                  } else if (schoolYearStart > 2023 && grade < 7) {
                    q1 = scholasticData[11]; // Column L
                    q2 = scholasticData[33]; // Column AH
                    q3 = scholasticData[55]; // Column BD
                    q4 = scholasticData[77]; // Column BZ
                    final = scholasticData[99]; // Column CV
                  } else {
                    q1 = scholasticData[12]; // Column M
                    q2 = scholasticData[34]; // Column AI
                    q3 = scholasticData[56]; // Column BE
                    q4 = scholasticData[78]; // Column CA
                    final = scholasticData[100]; // Column CW
                  }
                  break;
                case 13:
                  if (schoolYearStart > 2023 && grade < 4) {
                    q1 = scholasticData[11]; // Column L
                    q2 = scholasticData[33]; // Column AH
                    q3 = scholasticData[55]; // Column BD
                    q4 = scholasticData[77]; // Column BZ
                    final = scholasticData[99]; // Column CV
                  } else {
                    q1 = scholasticData[13]; // Column N
                    q2 = scholasticData[35]; // Column AJ
                    q3 = scholasticData[57]; // Column BF
                    q4 = scholasticData[79]; // Column CB
                    final = scholasticData[101]; // Column CX
                  }
                  break;
                case 14:
                  if (schoolYearStart > 2023 && grade < 4) {
                    q1 = q2 = q3 = q4 = final = "";
                  } else {
                    q1 = scholasticData[20]; // Column U
                    q2 = scholasticData[42]; // Column AQ
                    q3 = scholasticData[64]; // Column BM
                    q4 = scholasticData[86]; // Column CI
                    final = scholasticData[108]; // Column DE
                  }
                  break;
                case 15:
                  if (schoolYearStart > 2023) {
                    if (grade < 4) {
                      q1 = q2 = q3 = q4 = final = "";
                    } else if (grade >= 4) {
                      q1 = scholasticData[18]; // Column S
                      q2 = scholasticData[40]; // Column AO
                      q3 = scholasticData[62]; // Column BK
                      q4 = scholasticData[84]; // Column CG
                      final = scholasticData[106]; // Column DC
                    }
                  } else {
                    q1 = scholasticData[14]; // Column O
                    q2 = scholasticData[36]; // Column AK
                    q3 = scholasticData[58]; // Column BG
                    q4 = scholasticData[80]; // Column CC
                    final = scholasticData[102]; // Column CY
                  }
                  break;
                case 16:
                  if (schoolYearStart > 2023) {
                    if (grade < 4) {
                      q1 = q2 = q3 = q4 = final = "";
                    } else if (grade >= 4) {
                      q1 = scholasticData[19]; // Column T
                      q2 = scholasticData[41]; // Column AP
                      q3 = scholasticData[63]; // Column BL
                      q4 = scholasticData[85]; // Column CH
                      final = scholasticData[107]; // Column DD
                    }
                  } else {
                    q1 = scholasticData[15]; // Column P
                    q2 = scholasticData[37]; // Column AL
                    q3 = scholasticData[59]; // Column BH
                    q4 = scholasticData[81]; // Column CD
                    final = scholasticData[103]; // Column CZ
                  }
                  break;
                case 17:
                  if (schoolYearStart > 2023 && grade < 7) {
                    q1 = q2 = q3 = q4 = final = "";
                  } else {
                    q1 = scholasticData[16]; // Column Q
                    q2 = scholasticData[38]; // Column AM
                    q3 = scholasticData[60]; // Column BI
                    q4 = scholasticData[82]; // Column CE
                    final = scholasticData[104]; // Column DA
                  }
                  break;
                case 18:
                  if (schoolYearStart > 2023 && grade < 7) {
                    q1 = q2 = q3 = q4 = final = "";
                  } else {
                    q1 = scholasticData[17]; // Column R
                    q2 = scholasticData[39]; // Column AN
                    q3 = scholasticData[61]; // Column BJ
                    q4 = scholasticData[83]; // Column CF
                    final = scholasticData[105]; // Column DB
                  }
                  break;
                case 19:
                  if (schoolYearStart > 2023 && grade < 7) {
                    q1 = q2 = q3 = q4 = final = "";
                  } else {
                    q1 = scholasticData[21]; // Column V
                    q2 = scholasticData[43]; // Column AR
                    q3 = scholasticData[65]; // Column BN
                    q4 = scholasticData[87]; // Column CJ
                    final = scholasticData[109]; // Column DF
                  }
                  break;
                case 20:
                  q1 = scholasticData[24]; // Column Y
                  q2 = scholasticData[46]; // Column AU
                  q3 = scholasticData[68]; // Column BQ
                  q4 = scholasticData[90]; // Column CM
                  final = scholasticData[112]; // Column DI
                  break;
                case 21:
                  q1 = scholasticData[25]; // Column Z
                  q2 = scholasticData[47]; // Column AV
                  q3 = scholasticData[69]; // Column BR
                  q4 = scholasticData[91]; // Column CN
                  final = scholasticData[113]; // Column DJ
                  break;
                case 22:
                  q1 = scholasticData[26]; // Column AA
                  q2 = scholasticData[48]; // Column AW
                  q3 = scholasticData[70]; // Column BS
                  q4 = scholasticData[92]; // Column CO
                  final = scholasticData[114]; // Column DK
                  break;
              }
      
              q1 = sanitizeValue(q1);
              q2 = sanitizeValue(q2);
              q3 = sanitizeValue(q3);
              q4 = sanitizeValue(q4);
              final = sanitizeValue(final);
      
              // Determine remarks (column 7)
              if (final === "" || final === undefined) {
          // If final (column 5) is empty, set both final and remarks to empty
          final = "";
          remarks = "";
        } else if (rowNumber === 22) {
          // For the General Average row
          const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
            const rowFinal = getGradeData(row, gradeValue, schoolYearValue, scholasticData, 1).final;
            return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
          }, 0);
      
          if (failedCount > 2) {
            remarks = "RETAINED";
          } else if (failedCount === 0) {
            remarks = "PROMOTED";
          } else {
            remarks = "REMEDIAL";
          }
        } else {
          // For all other rows
          remarks = parseFloat(final) < 75 ? "FAILED" : "PASSED";
        }
      
        return { q1, q2, q3, q4, final, remarks };
            }
      
            function getGradeDataBox2(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        if (!gradeValue || !schoolYearValue) {
        
          return { q1, q2, q3, q4, final, remarks };
        }
      
        // Only proceed if both gradeValue and schoolYearValue are not empty
        if (gradeValue && schoolYearValue) {
          const schoolYearStart = parseInt(schoolYearValue.split('-')[0], 10);
          const grade = parseInt(gradeValue, 10);
      
          // Helper function to safely get values from scholasticData
          const safeGetValue = (index) => {
            return (scholasticData[index] !== undefined && scholasticData[index] !== null) ? scholasticData[index] : '';
          };
      
        switch (rowNumber) {
          case 7:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[148]; // Column ES
              q2 = scholasticData[170]; // Column FO
              q3 = scholasticData[192]; // Column GK
              q4 = scholasticData[214]; // Column HG
              final = scholasticData[236]; // Column IC
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[133]; // Column ED
              q2 = scholasticData[155]; // Column EZ
              q3 = scholasticData[177]; // Column FV
              q4 = scholasticData[199]; // Column GR
              final = scholasticData[221]; // Column HN
            } else {
              q1 = scholasticData[133]; // Column ED
              q2 = scholasticData[155]; // Column EZ
              q3 = scholasticData[177]; // Column FV
              q4 = scholasticData[199]; // Column GR
              final = scholasticData[221]; // Column HN
            }
            break;
          case 8:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[149]; // Column ET
              q2 = scholasticData[171]; // Column FP
              q3 = scholasticData[193]; // Column GL
              q4 = scholasticData[215]; // Column HH
              final = scholasticData[237]; // Column ID
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[134]; // Column ED
              q2 = scholasticData[156]; // Column FA
              q3 = scholasticData[178]; // Column FW
              q4 = scholasticData[200]; // Column GS
              final = scholasticData[222]; // Column Ho
            } else {
              q1 = scholasticData[134]; // Column EE
              q2 = scholasticData[156]; // Column FA
              q3 = scholasticData[178]; // Column FW
              q4 = scholasticData[200]; // Column GS
              final = scholasticData[222]; // Column HO
            }
            break;
          case 9:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[136]; // Column EG
              q2 = scholasticData[158]; // Column FC
              q3 = scholasticData[180]; // Column FY
              q4 = scholasticData[202]; // Column GU
              final = scholasticData[224]; // Column HQ
            } else {
              q1 = scholasticData[135]; // Column EF
              q2 = scholasticData[157]; // Column FB
              q3 = scholasticData[179]; // Column FX
              q4 = scholasticData[201]; // Column GT
              final = scholasticData[223]; // Column HP
            }
            break;
          case 10:
            if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[132]; // Column EC
                q2 = scholasticData[154]; // Column EY
                q3 = scholasticData[176]; // Column FU
                q4 = scholasticData[198]; // Column GQ
                final = scholasticData[220]; // Column HM
            }
            else {
              q1 = scholasticData[136]; // Column EG
              q2 = scholasticData[158]; // Column FC
              q3 = scholasticData[180]; // Column FY
              q4 = scholasticData[202]; // Column GU
              final = scholasticData[224]; // Column HQ
            }
            break;
          case 11:
            if (grade < 7 && schoolYearStart > 2023) {
              q1 = scholasticData[131]; // Column EB
              q2 = scholasticData[153]; // Column EX
              q3 = scholasticData[175]; // Column FT
              q4 = scholasticData[197]; // Column GP
              final = scholasticData[219]; // Column HL
            } else {
              q1 = scholasticData[137]; // Column EH
              q2 = scholasticData[159]; // Column FD
              q3 = scholasticData[181]; // Column FZ
              q4 = scholasticData[203]; // Column GV
              final = scholasticData[225]; // Column HR
            }
            break;
          case 12:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = q2 = q3 = q4 = final = "";
            } else if (grade === 2 && schoolYearStart > 2024) {
              q1 = q2 = q3 = q4 = final = "";
            } else if (grade === 3 && schoolYearStart > 2025) {
              q1 = q2 = q3 = q4 = final = "";    
            } else if (grade === 4 && schoolYearStart > 2024) {
              q1 = scholasticData[137]; // Column EH
              q2 = scholasticData[159]; // Column FD
              q3 = scholasticData[181]; // Column FZ
              q4 = scholasticData[203]; // Column GV
              final = scholasticData[225]; // Column HR
            } else {
              q1 = scholasticData[138]; // Column EI
              q2 = scholasticData[160]; // Column FE
              q3 = scholasticData[182]; // Column GA
              q4 = scholasticData[204]; // Column GW
              final = scholasticData[226]; // Column HS
            }
            break;
          case 13:
            if (schoolYearStart > 2023 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[139]; // Column EJ
              q2 = scholasticData[161]; // Column FF
              q3 = scholasticData[183]; // Column GB
              q4 = scholasticData[205]; // Column GX
              final = scholasticData[227]; // Column HT
            }
            break;
          case 14:
            if (schoolYearStart > 2024 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[146]; // Column EQ
              q2 = scholasticData[168]; // Column FM
              q3 = scholasticData[190]; // Column GI
              q4 = scholasticData[212]; // Column HE
              final = scholasticData[234]; // Column IA
            }
            break;
          case 15:
            if (schoolYearStart > 2024) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[144]; // Column EO
                q2 = scholasticData[166]; // Column FK
                q3 = scholasticData[188]; // Column GG
                q4 = scholasticData[210]; // Column HC
                final = scholasticData[232]; // Column HY
              }
            } else {
              q1 = scholasticData[140]; // Column EK
              q2 = scholasticData[162]; // Column FG
              q3 = scholasticData[184]; // Column GC
              q4 = scholasticData[206]; // Column GY
              final = scholasticData[228]; // Column HU
            }
            break;
          case 16:
            if (schoolYearStart > 2024) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[145]; // Column EP
                q2 = scholasticData[167]; // Column FL
                q3 = scholasticData[189]; // Column GH
                q4 = scholasticData[211]; // Column HD
                final = scholasticData[233]; // Column HZ
              }
            } else {
              q1 = scholasticData[141]; // Column EL
              q2 = scholasticData[163]; // Column FH
              q3 = scholasticData[185]; // Column GD
              q4 = scholasticData[207]; // Column GZ
              final = scholasticData[229]; // Column HV
            }
            break;
          case 17:
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[142]; // Column EM
              q2 = scholasticData[164]; // Column FI
              q3 = scholasticData[186]; // Column GE
              q4 = scholasticData[208]; // Column HA
              final = scholasticData[230]; // Column HW
            }
            break;
          case 18:
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[143]; // Column EN
              q2 = scholasticData[165]; // Column FJ
              q3 = scholasticData[187]; // Column GF
              q4 = scholasticData[209]; // Column HB
              final = scholasticData[231]; // Column HX
            }
            break;
          case 19:
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[147]; // Column ER
              q2 = scholasticData[169]; // Column FN
              q3 = scholasticData[191]; // Column GJ
              q4 = scholasticData[213]; // Column HF
              final = scholasticData[235]; // Column IB
            }
            break;
          case 20:
            q1 = scholasticData[150]; // Column EU
            q2 = scholasticData[172]; // Column FQ
            q3 = scholasticData[194]; // Column GM
            q4 = scholasticData[216]; // Column HI
            final = scholasticData[238]; // Column IE
            break;
          case 21:
            q1 = scholasticData[151]; // Column EV
            q2 = scholasticData[173]; // Column FR
            q3 = scholasticData[195]; // Column GN
            q4 = scholasticData[217]; // Column HJ
            final = scholasticData[239]; // Column IF
            break;
          case 22:
            q1 = scholasticData[152]; // Column EW
            q2 = scholasticData[174]; // Column FS
            q3 = scholasticData[196]; // Column GO
            q4 = scholasticData[218]; // Column HK
            final = scholasticData[240]; // Column IG
            break;
        }
      
        ;
      
        // Determine remarks
        if (rowNumber === 22) {
          if (final === "") {
            remarks = "";
            
          } else {
            const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
              const rowFinal = getGradeDataBox2(row, gradeValue, schoolYearValue, scholasticData).final;
              
              return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
            }, 0);
      
            
      
            if (failedCount > 2) {
              remarks = "RETAINED";
            } else if (failedCount === 0) {
              remarks = "PROMOTED";
            } else {
              remarks = "REMEDIAL";
            }
            
          }
        } else {
          remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
          
        }
      
        
        return { q1, q2, q3, q4, final, remarks };
      }
            }
      
            function getGradeDataBox3(rowNumber, gradeValue, schoolYearValue, scholasticData) {
      
        
        
              // Check for empty, "NA", or "#N/A" values
              if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
                
                return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
              }
            
              
              const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
              const grade = parseInt(gradeValue, 10);
              const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
            
              let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
            
            
              function getColumnIndex(letter) {
              let index = 0;
              for (let i = 0; i < letter.length; i++) {
                index = index * 26 + letter.charCodeAt(i) - 64;
              }
              return index - 1; // Subtract 1 because array indices start at 0
            }

              switch (rowNumber) {
          case 7: // Mother Tongue
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('JM')];
              q2 = scholasticData[getColumnIndex('KI')];
              q3 = scholasticData[getColumnIndex('LE')];
              q4 = scholasticData[getColumnIndex('MA')];
              final = scholasticData[getColumnIndex('MW')];
            } else if (grade > 1 && schoolYearStart > 2024) {
              q1 = scholasticData[getColumnIndex('IY')];
              q2 = scholasticData[getColumnIndex('JU')];
              q3 = scholasticData[getColumnIndex('KQ')];
              q4 = scholasticData[getColumnIndex('LM')];
              final = scholasticData[getColumnIndex('MI')];
            } else {
              q1 = scholasticData[getColumnIndex('IX')];
              q2 = scholasticData[getColumnIndex('JT')];
              q3 = scholasticData[getColumnIndex('KP')];
              q4 = scholasticData[getColumnIndex('LL')];
              final = scholasticData[getColumnIndex('MH')];
            }
            break;
          case 8: // Filipino
            if (grade === 1 && schoolYearStart > 2024) {
              q1 = scholasticData[getColumnIndex('JN')];
              q2 = scholasticData[getColumnIndex('KJ')];
              q3 = scholasticData[getColumnIndex('LF')];
              q4 = scholasticData[getColumnIndex('MB')];
              final = scholasticData[getColumnIndex('MX')];
            } else if (grade > 1 && schoolYearStart > 2024) {
              q1 = scholasticData[getColumnIndex('IZ')];
              q2 = scholasticData[getColumnIndex('JV')];
              q3 = scholasticData[getColumnIndex('KR')];
              q4 = scholasticData[getColumnIndex('LN')];
              final = scholasticData[getColumnIndex('MJ')];
            } else {
              q1 = scholasticData[getColumnIndex('IY')];
              q2 = scholasticData[getColumnIndex('JU')];
              q3 = scholasticData[getColumnIndex('KQ')];
              q4 = scholasticData[getColumnIndex('LM')];
              final = scholasticData[getColumnIndex('MI')];
            }
            break;
          case 9: // English
            if (grade < 7 && schoolYearStart > 2024) {
              q1 = scholasticData[getColumnIndex('JA')];
              q2 = scholasticData[getColumnIndex('JW')];
              q3 = scholasticData[getColumnIndex('KS')];
              q4 = scholasticData[getColumnIndex('LO')];
              final = scholasticData[getColumnIndex('MK')];
            } else {
              q1 = scholasticData[getColumnIndex('IZ')];
              q2 = scholasticData[getColumnIndex('JV')];
              q3 = scholasticData[getColumnIndex('KR')];
              q4 = scholasticData[getColumnIndex('LN')];
              final = scholasticData[getColumnIndex('MJ')];
            }
            break;
          case 10: // Mathematics
            if (schoolYearStart > 2024) {
              if (grade < 4) {
                q1 = scholasticData[getColumnIndex('IW')];
                q2 = scholasticData[getColumnIndex('JS')];
                q3 = scholasticData[getColumnIndex('KO')];
                q4 = scholasticData[getColumnIndex('LK')];
                final = scholasticData[getColumnIndex('MG')];
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('JC')];
                q2 = scholasticData[getColumnIndex('JY')];
                q3 = scholasticData[getColumnIndex('KU')];
                q4 = scholasticData[getColumnIndex('LQ')];
                final = scholasticData[getColumnIndex('MM')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('JA')];
              q2 = scholasticData[getColumnIndex('JW')];
              q3 = scholasticData[getColumnIndex('KS')];
              q4 = scholasticData[getColumnIndex('LO')];
              final = scholasticData[getColumnIndex('MK')];
            }
            break;
          case 11: // Science
            if (grade < 7 && schoolYearStart > 2024) {
              q1 = scholasticData[getColumnIndex('IV')];
              q2 = scholasticData[getColumnIndex('JR')];
              q3 = scholasticData[getColumnIndex('KN')];
              q4 = scholasticData[getColumnIndex('LJ')];
              final = scholasticData[getColumnIndex('MF')];
            } else {
              q1 = scholasticData[getColumnIndex('JB')];
              q2 = scholasticData[getColumnIndex('JX')];
              q3 = scholasticData[getColumnIndex('KT')];
              q4 = scholasticData[getColumnIndex('LP')];
              final = scholasticData[getColumnIndex('ML')];
            }
            break;
          case 12: // Araling Panlipunan
          if (grade === 1 && schoolYearStart > 2023) {
            q1 = q2 = q3 = q4 = final = "";
          } else if (grade === 2 && schoolYearStart >= 2025) {
            q1 = q2 = q3 = q4 = final = "";
          } else if (grade === 3 && schoolYearStart >= 2026) {
            q1 = q2 = q3 = q4 = final = "";    
          } else if (grade === 4 && schoolYearStart >=2024) {
              q1 = scholasticData[getColumnIndex('JB')];
              q2 = scholasticData[getColumnIndex('JX')];
              q3 = scholasticData[getColumnIndex('KT')];
              q4 = scholasticData[getColumnIndex('LP')];
              final = scholasticData[getColumnIndex('ML')];
            } else {
              q1 = scholasticData[getColumnIndex('JC')];
              q2 = scholasticData[getColumnIndex('JY')];
              q3 = scholasticData[getColumnIndex('KU')];
              q4 = scholasticData[getColumnIndex('LQ')];
              final = scholasticData[getColumnIndex('MM')];
            }
            break;
          case 13: // EPP/TLE
            if (schoolYearStart > 2024 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('JD')];
              q2 = scholasticData[getColumnIndex('JZ')];
              q3 = scholasticData[getColumnIndex('KV')];
              q4 = scholasticData[getColumnIndex('LR')];
              final = scholasticData[getColumnIndex('MN')];
            }
            break;
          case 14: // MAPEH
            if (schoolYearStart > 2024 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('JK')];
              q2 = scholasticData[getColumnIndex('KG')];
              q3 = scholasticData[getColumnIndex('LC')];
              q4 = scholasticData[getColumnIndex('LY')];
              final = scholasticData[getColumnIndex('MU')];
            }
            break;
          case 15: // Music
            if (schoolYearStart > 2024) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('JI')];
                q2 = scholasticData[getColumnIndex('KE')];
                q3 = scholasticData[getColumnIndex('LA')];
                q4 = scholasticData[getColumnIndex('LW')];
                final = scholasticData[getColumnIndex('MS')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('JE')];
              q2 = scholasticData[getColumnIndex('KA')];
              q3 = scholasticData[getColumnIndex('KW')];
              q4 = scholasticData[getColumnIndex('LS')];
              final = scholasticData[getColumnIndex('MO')];
            }
            break;
          case 16: // Arts
            if (schoolYearStart > 2024) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('JJ')];
                q2 = scholasticData[getColumnIndex('KF')];
                q3 = scholasticData[getColumnIndex('LB')];
                q4 = scholasticData[getColumnIndex('LX')];
                final = scholasticData[getColumnIndex('MT')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('JF')];
              q2 = scholasticData[getColumnIndex('KB')];
              q3 = scholasticData[getColumnIndex('KX')];
              q4 = scholasticData[getColumnIndex('LT')];
              final = scholasticData[getColumnIndex('MP')];
            }
            break;
          case 17: // Physical Education
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('JG')];
              q2 = scholasticData[getColumnIndex('KC')];
              q3 = scholasticData[getColumnIndex('KY')];
              q4 = scholasticData[getColumnIndex('LU')];
              final = scholasticData[getColumnIndex('MQ')];
            }
            break;
          case 18: // Health
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('JH')];
              q2 = scholasticData[getColumnIndex('KD')];
              q3 = scholasticData[getColumnIndex('KZ')];
              q4 = scholasticData[getColumnIndex('LV')];
              final = scholasticData[getColumnIndex('MR')];
            }
            break;
          case 19: // Edukasyon sa Pagpapakatao
            if (schoolYearStart > 2024 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('JL')];
              q2 = scholasticData[getColumnIndex('KH')];
              q3 = scholasticData[getColumnIndex('LD')];
              q4 = scholasticData[getColumnIndex('LZ')];
              final = scholasticData[getColumnIndex('MV')];
            }
            break;
          case 20: // Arabic Language or Islamic Values Education
            if (getSubjectText(20, gradeValue, schoolYearValue).includes("Arabic Language")) {
              q1 = scholasticData[getColumnIndex('JO')];
              q2 = scholasticData[getColumnIndex('KK')];
              q3 = scholasticData[getColumnIndex('LG')];
              q4 = scholasticData[getColumnIndex('MC')];
              final = scholasticData[getColumnIndex('MY')];
            } else if (getSubjectText(20, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
              q1 = scholasticData[getColumnIndex('JP')];
              q2 = scholasticData[getColumnIndex('KL')];
              q3 = scholasticData[getColumnIndex('LH')];
              q4 = scholasticData[getColumnIndex('MD')];
              final = scholasticData[getColumnIndex('MZ')];
            }
            break;
          case 21: // Islamic Values Education (if not in row 20)
            if (getSubjectText(21, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
              q1 = scholasticData[getColumnIndex('JP')];
              q2 = scholasticData[getColumnIndex('KL')];
              q3 = scholasticData[getColumnIndex('LH')];
              q4 = scholasticData[getColumnIndex('MD')];
              final = scholasticData[getColumnIndex('MZ')];
            }
            break;
          case 22: // General Average
            q1 = scholasticData[getColumnIndex('JQ')];
            q2 = scholasticData[getColumnIndex('KM')];
            q3 = scholasticData[getColumnIndex('LI')];
            q4 = scholasticData[getColumnIndex('ME')];
            final = scholasticData[getColumnIndex('NA')];
            break;
        }

        q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);  
      
          // Determine remarks
      if (rowNumber === 22) {
        if (final === "") {
          remarks = "";
        } else {
          const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
            const rowFinal = getGradeDataBox3(row, gradeValue, schoolYearValue, scholasticData).final;
            return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
          }, 0);
      
          if (failedCount > 2) {
            remarks = "RETAINED";
          } else if (failedCount === 0) {
            remarks = "PROMOTED";
          } else {
            remarks = "REMEDIAL";
          }
        }
      } else {
        remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
      }
      
      return { q1, q2, q3, q4, final, remarks };
      }
      
      function getGradeDataBox4(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        // Check for empty, "NA", or "#N/A" values
        if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
          
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
        
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
      
        function getColumnIndex(letter) {
          let index = 0;
          for (let i = 0; i < letter.length; i++) {
            index = index * 26 + letter.charCodeAt(i) - 64;
          }
          return index - 1;
        }
      
        try {
          switch (rowNumber) {
            case 7:
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('OG')];
                q2 = scholasticData[getColumnIndex('PC')];
                q3 = scholasticData[getColumnIndex('PY')];
                q4 = scholasticData[getColumnIndex('QU')];
                final = scholasticData[getColumnIndex('RQ')];
              } else if (grade >= 4 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('NS')];
                q2 = scholasticData[getColumnIndex('OO')];
                q3 = scholasticData[getColumnIndex('PK')];
                q4 = scholasticData[getColumnIndex('QG')];
                final = scholasticData[getColumnIndex('RC')];
              } else {
                q1 = scholasticData[getColumnIndex('NR')];
                q2 = scholasticData[getColumnIndex('ON')];
                q3 = scholasticData[getColumnIndex('PJ')];
                q4 = scholasticData[getColumnIndex('QF')];
                final = scholasticData[getColumnIndex('RB')];
              }
              break;
            case 8:
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('OH')];
                q2 = scholasticData[getColumnIndex('PD')];
                q3 = scholasticData[getColumnIndex('PZ')];
                q4 = scholasticData[getColumnIndex('QV')];
                final = scholasticData[getColumnIndex('RR')];
              } else if (grade >= 4 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('NT')];
                q2 = scholasticData[getColumnIndex('OP')];
                q3 = scholasticData[getColumnIndex('PL')];
                q4 = scholasticData[getColumnIndex('QH')];
                final = scholasticData[getColumnIndex('RD')];
              } else {
                q1 = scholasticData[getColumnIndex('NS')];
                q2 = scholasticData[getColumnIndex('OO')];
                q3 = scholasticData[getColumnIndex('PK')];
                q4 = scholasticData[getColumnIndex('QG')];
                final = scholasticData[getColumnIndex('RC')];
              }
              break;
            case 9:
              if (grade > 3 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('NU')];
                q2 = scholasticData[getColumnIndex('OQ')];
                q3 = scholasticData[getColumnIndex('PM')];
                q4 = scholasticData[getColumnIndex('QI')];
                final = scholasticData[getColumnIndex('RE')];
              } else {
                q1 = scholasticData[getColumnIndex('NT')];
                q2 = scholasticData[getColumnIndex('OP')];
                q3 = scholasticData[getColumnIndex('PL')];
                q4 = scholasticData[getColumnIndex('QH')];
                final = scholasticData[getColumnIndex('RD')];
              }
              break;
            case 10:
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  q1 = scholasticData[getColumnIndex('NU')];
                  q2 = scholasticData[getColumnIndex('OQ')];
                  q3 = scholasticData[getColumnIndex('PM')];
                  q4 = scholasticData[getColumnIndex('QI')];
                  final = scholasticData[getColumnIndex('RE')];
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('NW')];
                  q2 = scholasticData[getColumnIndex('OS')];
                  q3 = scholasticData[getColumnIndex('PO')];
                  q4 = scholasticData[getColumnIndex('QK')];
                  final = scholasticData[getColumnIndex('RG')];
                }
              }
              break;
            case 11:
              if (grade < 7 && schoolYearStart >= 2024) {
                q1 = scholasticData[getColumnIndex('NP')];
                q2 = scholasticData[getColumnIndex('OL')];
                q3 = scholasticData[getColumnIndex('PH')];
                q4 = scholasticData[getColumnIndex('QD')];
                final = scholasticData[getColumnIndex('QZ')];
              } else {
                q1 = scholasticData[getColumnIndex('NV')];
                q2 = scholasticData[getColumnIndex('OR')];
                q3 = scholasticData[getColumnIndex('PN')];
                q4 = scholasticData[getColumnIndex('QJ')];
                final = scholasticData[getColumnIndex('RF')];
              }
              break;
            case 12:
              if (grade < 2 && schoolYearStart > 2023) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (schoolYearStart >= 2024 && grade < 7) {
                q1 = scholasticData[getColumnIndex('NV')];
                q2 = scholasticData[getColumnIndex('OR')];
                q3 = scholasticData[getColumnIndex('PN')];
                q4 = scholasticData[getColumnIndex('QJ')];
                final = scholasticData[getColumnIndex('RF')];
              } else {
                q1 = scholasticData[getColumnIndex('NW')];
                q2 = scholasticData[getColumnIndex('OS')];
                q3 = scholasticData[getColumnIndex('PO')];
                q4 = scholasticData[getColumnIndex('QK')];
                final = scholasticData[getColumnIndex('RG')];
              }
              break;
            case 13:
              if (schoolYearStart > 2023 && grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else {
                q1 = scholasticData[getColumnIndex('NX')];
                q2 = scholasticData[getColumnIndex('OT')];
                q3 = scholasticData[getColumnIndex('PP')];
                q4 = scholasticData[getColumnIndex('QL')];
                final = scholasticData[getColumnIndex('RH')];
              }
              break;
            case 14:
              if (schoolYearStart > 2026 && grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else {
                q1 = scholasticData[getColumnIndex('OE')];
                q2 = scholasticData[getColumnIndex('PA')];
                q3 = scholasticData[getColumnIndex('PW')];
                q4 = scholasticData[getColumnIndex('QS')];
                final = scholasticData[getColumnIndex('RO')];
              }
              break;
            case 15:
              if (schoolYearStart > 2026 && grade < 4) {
                  q1 = q2 = q3 = q4 = final = "";
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('OC')];
                  q2 = scholasticData[getColumnIndex('OY')];
                  q3 = scholasticData[getColumnIndex('PU')];
                  q4 = scholasticData[getColumnIndex('QQ')];
                  final = scholasticData[getColumnIndex('RM')];
              } else {
                q1 = scholasticData[getColumnIndex('NY')];
                q2 = scholasticData[getColumnIndex('OU')];
                q3 = scholasticData[getColumnIndex('PQ')];
                q4 = scholasticData[getColumnIndex('QM')];
                final = scholasticData[getColumnIndex('RI')];
              }
            
              break;
            case 16:
              if (schoolYearStart > 2026 && grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('OD')];
                  q2 = scholasticData[getColumnIndex('OZ')];
                  q3 = scholasticData[getColumnIndex('PV')];
                  q4 = scholasticData[getColumnIndex('QR')];
                  final = scholasticData[getColumnIndex('RN')];
              } else {
                q1 = scholasticData[getColumnIndex('NZ')];
                q2 = scholasticData[getColumnIndex('OV')];
                q3 = scholasticData[getColumnIndex('PR')];
                q4 = scholasticData[getColumnIndex('QN')];
                final = scholasticData[getColumnIndex('RJ')];
              }
              break;
            case 17:
              if (schoolYearStart > 2026 && grade < 7) {
                q1 = q2 = q3 = q4 = final = "";
              } else {
                q1 = scholasticData[getColumnIndex('OA')];
                q2 = scholasticData[getColumnIndex('OW')];
                q3 = scholasticData[getColumnIndex('PS')];
                q4 = scholasticData[getColumnIndex('QO')];
                final = scholasticData[getColumnIndex('RK')];
              }
              break;
            case 18:
              if (schoolYearStart > 2026 && grade < 7) {
                q1 = q2 = q3 = q4 = final = "";
              } else {
                q1 = scholasticData[getColumnIndex('OB')];
                q2 = scholasticData[getColumnIndex('OX')];
                q3 = scholasticData[getColumnIndex('PT')];
                q4 = scholasticData[getColumnIndex('QP')];
                final = scholasticData[getColumnIndex('RL')];
              }
              break;
            case 19:
              if (schoolYearStart > 2026 && grade < 7) {
                q1 = q2 = q3 = q4 = final = "";
              } else {
                q1 = scholasticData[getColumnIndex('OF')];
                q2 = scholasticData[getColumnIndex('PB')];
                q3 = scholasticData[getColumnIndex('PX')];
                q4 = scholasticData[getColumnIndex('QT')];
                final = scholasticData[getColumnIndex('RP')];
              }
              break;
            case 20:
              if (getSubjectText(20, gradeValue, schoolYearValue).includes("Arabic Language")) {
                q1 = scholasticData[getColumnIndex('OI')];
                q2 = scholasticData[getColumnIndex('PE')];
                q3 = scholasticData[getColumnIndex('QA')];
                q4 = scholasticData[getColumnIndex('QW')];
                final = scholasticData[getColumnIndex('RS')];
              } else if (getSubjectText(20, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('OJ')];
                q2 = scholasticData[getColumnIndex('PF')];
                q3 = scholasticData[getColumnIndex('QB')];
                q4 = scholasticData[getColumnIndex('QX')];
                final = scholasticData[getColumnIndex('RT')];
              }
              break;
            case 21:
              if (getSubjectText(21, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('OJ')];
                q2 = scholasticData[getColumnIndex('PF')];
                q3 = scholasticData[getColumnIndex('QB')];
                q4 = scholasticData[getColumnIndex('QX')];
                final = scholasticData[getColumnIndex('RT')];
              }
              break;
            case 22:
              q1 = scholasticData[getColumnIndex('OK')];
              q2 = scholasticData[getColumnIndex('PG')];
              q3 = scholasticData[getColumnIndex('QC')];
              q4 = scholasticData[getColumnIndex('QY')];
              final = scholasticData[getColumnIndex('RU')];
              break;
          }
      
          q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);
      
        // Determine remarks (column 7)
        if (final === "") {
          remarks = "";
        } else
          if (rowNumber === 22) {
            if (final === "") {
              remarks = "";
            } else {
              const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
                const rowFinal = getGradeDataBox4(row, gradeValue, schoolYearValue, scholasticData).final;
                return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
              }, 0);
      
              if (failedCount > 2) {
                remarks = "RETAINED";
              } else if (failedCount === 0) {
                remarks = "PROMOTED";
              } else {
                remarks = "REMEDIAL";
              }
            }
          } else {
            remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
          }
      
          
      
          return { q1, q2, q3, q4, final, remarks };
        } catch (error) {
          
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      }
              
      
      function createBox2(profileData, scholasticData) {
        const gradeValue = profileData[34]; // AI for Box 2
        const schoolYearValue = profileData[32]; // AG for Box 2
        const signatureValue = profileData[103]; // Column CT for Box 2 signature
      
        let gradesSection = `
          <!-- Grades Section Header (Rows 5 and 6) -->
          <tr class="grades-header-row">
            <td colspan="9" rowspan="2" class="grades-area-label">LEARNING AREAS</td>
            <td colspan="4" class="grades-quarter-label">Quarterly Rating</td>
            <td colspan="3" rowspan="2" class="grades-final-label">Final<br>Rating</td>
            <td colspan="3" rowspan="2" class="grades-remarks-label">Remarks</td>
          </tr>
          <tr class="grades-header-row">
            <td class="grades-quarter-num">1</td>
            <td class="grades-quarter-num">2</td>
            <td class="grades-quarter-num">3</td>
            <td class="grades-quarter-num">4</td>
          </tr>
        `;
      
        // Add rows 7 to 22 with merged cells in the first column
        for (let i = 7; i <= 22; i++) {
          let subjectText = getSubjectText(i, gradeValue, schoolYearValue);
          let cellClass = 'subject-cell';
          
          if ((i >= 7 && i <= 14) || i === 19 || i === 22) {
            cellClass += ' subject-cell-bold';
          } else if ((i >= 15 && i <= 18) || i === 20 || i === 21) {
            cellClass += ' subject-cell-italic';
          }
      
          const gradeData = getGradeDataBox2(i, gradeValue, schoolYearValue, scholasticData);
      
          gradesSection += `
            <tr class="grades-data-row">
              <td colspan="9" class="${cellClass}" style="white-space: pre-wrap;">${subjectText}</td>
              <td class="grade-cell">${gradeData.q1}</td>
              <td class="grade-cell">${gradeData.q2}</td>
              <td class="grade-cell">${gradeData.q3}</td>
              <td class="grade-cell">${gradeData.q4}</td>
              <td colspan="3" class="final-grade-cell">${gradeData.final}</td>
              <td colspan="3" class="remarks-cell">${gradeData.remarks}</td>
            </tr>
          `;
        }
      
        return `
          <table class="box">
            <tr>
              <td colspan="14">
                <span class="label" id="box2-school-label">School:</span>
                ${displayValue(profileData[40], 180)}
              </td>
              <td colspan="5" class="school-id-container">
                <span class="label" id="box2-school-id-label">School ID:</span>
                ${displayValue(profileData[39], 35)}
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <span class="label" id="box2-district-label">District:</span>
                ${displayValue(profileData[38], 95)}
              </td>
              <td colspan="8">
                <span class="label" id="box2-division-label">Division:</span>
                ${displayValue(profileData[37], 97)}
              </td>
              <td colspan="3" class="region-container">
                <span class="label" id="box2-region-label">Region:</span>
                ${displayValue(profileData[36], 15)}
              </td>
            </tr>
            <tr>
              <td colspan="6" style="width: 31.5%;">
                <span class="label" id="box2-grade-label">Classified as Grade:</span>
                ${displayValue(profileData[34], 56)}
              </td>
              <td colspan="8" style="width: 42%;">
                <span class="label" id="box2-section-label">Section:</span>
                ${displayValue(profileData[35], 70)}
              </td>
              <td colspan="5" style="width: 26.5%;" class="school-year-container">
                <span class="label" id="box2-school-year-label">School Year:</span>
                ${displayValue(profileData[32], 42, true)}
              </td>
            </tr>
            <tr>
              <td colspan="13">
                <span class="label" id="box2-adviser-label">Name of Adviser/Teacher:</span>
                ${displayValue(profileData[33], 150)}
              </td>
              <td colspan="2">
                <span class="label" id="box2-signature-label">Signature:</span>
              </td>
              <td colspan="4">
                ${displaySignature(signatureValue, 100)}
              </td>
            </tr>
            ${gradesSection}
          </table>
        `;
      }
      
      function getGradeDataBox5(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
        
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        function getColumnIndex(letter) {
          let index = 0;
          for (let i = 0; i < letter.length; i++) {
            index = index * 26 + letter.charCodeAt(i) - 64;
          }
          return index - 1;
        }
      
        try {
          switch (rowNumber) {
            case 7: // Mother Tongue
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('TA')];
                q2 = scholasticData[getColumnIndex('TW')];
                q3 = scholasticData[getColumnIndex('US')];
                q4 = scholasticData[getColumnIndex('VO')];
                final = scholasticData[getColumnIndex('WK')];
              } else if (grade > 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('SM')];
                q2 = scholasticData[getColumnIndex('TI')];
                q3 = scholasticData[getColumnIndex('UE')];
                q4 = scholasticData[getColumnIndex('VA')];
                final = scholasticData[getColumnIndex('VW')];
              } else {
                q1 = scholasticData[getColumnIndex('SL')];
                q2 = scholasticData[getColumnIndex('TH')];
                q3 = scholasticData[getColumnIndex('UD')];
                q4 = scholasticData[getColumnIndex('UZ')];
                final = scholasticData[getColumnIndex('VV')];
              }
              break;
            case 8: // Filipino
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('TB')];
                q2 = scholasticData[getColumnIndex('TX')];
                q3 = scholasticData[getColumnIndex('UT')];
                q4 = scholasticData[getColumnIndex('VP')];
                final = scholasticData[getColumnIndex('WL')];
              } else if (grade > 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('SN')];
                q2 = scholasticData[getColumnIndex('TJ')];
                q3 = scholasticData[getColumnIndex('UF')];
                q4 = scholasticData[getColumnIndex('VB')];
                final = scholasticData[getColumnIndex('VX')];
              } else {
                q1 = scholasticData[getColumnIndex('SM')];
                q2 = scholasticData[getColumnIndex('TI')];
                q3 = scholasticData[getColumnIndex('UE')];
                q4 = scholasticData[getColumnIndex('VA')];
                final = scholasticData[getColumnIndex('VW')];
              }
              break;
            case 9: // English
              if (grade < 7 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('SO')];
                q2 = scholasticData[getColumnIndex('TK')];
                q3 = scholasticData[getColumnIndex('UG')];
                q4 = scholasticData[getColumnIndex('VC')];
                final = scholasticData[getColumnIndex('VY')];
              } else {
                q1 = scholasticData[getColumnIndex('SN')];
                q2 = scholasticData[getColumnIndex('TJ')];
                q3 = scholasticData[getColumnIndex('UF')];
                q4 = scholasticData[getColumnIndex('VB')];
                final = scholasticData[getColumnIndex('VX')];
              }
              break;
            case 10: // Mathematics
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  q1 = scholasticData[getColumnIndex('SK')];
                  q2 = scholasticData[getColumnIndex('TG')];
                  q3 = scholasticData[getColumnIndex('UC')];
                  q4 = scholasticData[getColumnIndex('UY')];
                  final = scholasticData[getColumnIndex('VU')];
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('SQ')];
                  q2 = scholasticData[getColumnIndex('TM')];
                  q3 = scholasticData[getColumnIndex('UI')];
                  q4 = scholasticData[getColumnIndex('VE')];
                  final = scholasticData[getColumnIndex('WA')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('SO')];
                q2 = scholasticData[getColumnIndex('TK')];
                q3 = scholasticData[getColumnIndex('UG')];
                q4 = scholasticData[getColumnIndex('VC')];
                final = scholasticData[getColumnIndex('VY')];
              }
              break;
            case 11: // Science
              if (grade < 7 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('SJ')];
                q2 = scholasticData[getColumnIndex('TF')];
                q3 = scholasticData[getColumnIndex('UB')];
                q4 = scholasticData[getColumnIndex('UX')];
                final = scholasticData[getColumnIndex('VT')];
              } else {
                q1 = scholasticData[getColumnIndex('SP')];
                q2 = scholasticData[getColumnIndex('TL')];
                q3 = scholasticData[getColumnIndex('UH')];
                q4 = scholasticData[getColumnIndex('VD')];
                final = scholasticData[getColumnIndex('VZ')];
              }
              break;
            case 12: // Araling Panlipunan (AP)
              if (grade < 3 && schoolYearStart > 2023) {
                // Empty string for grades 1-2 after 2023
              } else if (schoolYearStart > 2023 && grade < 7) {
                q1 = scholasticData[getColumnIndex('SP')];
                q2 = scholasticData[getColumnIndex('TL')];
                q3 = scholasticData[getColumnIndex('UH')];
                q4 = scholasticData[getColumnIndex('VD')];
                final = scholasticData[getColumnIndex('VZ')];
              } else {
                q1 = scholasticData[getColumnIndex('SQ')];
                q2 = scholasticData[getColumnIndex('TM')];
                q3 = scholasticData[getColumnIndex('UI')];
                q4 = scholasticData[getColumnIndex('VE')];
                final = scholasticData[getColumnIndex('WA')];
              }
              break;
            case 13: // Edukasyon sa Pagpapakatao (EsP)
              if (schoolYearStart > 2023 && grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('SR')];
                q2 = scholasticData[getColumnIndex('TN')];
                q3 = scholasticData[getColumnIndex('UJ')];
                q4 = scholasticData[getColumnIndex('VF')];
                final = scholasticData[getColumnIndex('WB')];
              }
              break;
            case 14: // Music
              if (schoolYearStart > 2023 && grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('SY')];
                q2 = scholasticData[getColumnIndex('TU')];
                q3 = scholasticData[getColumnIndex('UQ')];
                q4 = scholasticData[getColumnIndex('VM')];
                final = scholasticData[getColumnIndex('WI')];
              }
              break;
            case 15: // Arts
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('SW')];
                  q2 = scholasticData[getColumnIndex('TS')];
                  q3 = scholasticData[getColumnIndex('UO')];
                  q4 = scholasticData[getColumnIndex('VK')];
                  final = scholasticData[getColumnIndex('WG')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('SS')];
                q2 = scholasticData[getColumnIndex('TO')];
                q3 = scholasticData[getColumnIndex('UK')];
                q4 = scholasticData[getColumnIndex('VG')];
                final = scholasticData[getColumnIndex('WC')];
              }
              break;
            case 16: // Physical Education
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('SX')];
                  q2 = scholasticData[getColumnIndex('TT')];
                  q3 = scholasticData[getColumnIndex('UP')];
                  q4 = scholasticData[getColumnIndex('VL')];
                  final = scholasticData[getColumnIndex('WH')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('ST')];
                q2 = scholasticData[getColumnIndex('TP')];
                q3 = scholasticData[getColumnIndex('UL')];
                q4 = scholasticData[getColumnIndex('VH')];
                final = scholasticData[getColumnIndex('WD')];
              }
              break;
            case 17: // Health
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('SU')];
                q2 = scholasticData[getColumnIndex('TQ')];
                q3 = scholasticData[getColumnIndex('UM')];
                q4 = scholasticData[getColumnIndex('VI')];
                final = scholasticData[getColumnIndex('WE')];
              }
              break;
            case 18: // Edukasyong Pantahanan at Pangkabuhayan (EPP) / Technology and Livelihood Education (TLE)
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('SV')];
                q2 = scholasticData[getColumnIndex('TR')];
                q3 = scholasticData[getColumnIndex('UN')];
                q4 = scholasticData[getColumnIndex('VJ')];
                final = scholasticData[getColumnIndex('WF')];
              }
              break;
            case 19: // MAPEH
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('SZ')];
                q2 = scholasticData[getColumnIndex('TV')];
                q3 = scholasticData[getColumnIndex('UR')];
                q4 = scholasticData[getColumnIndex('VN')];
                final = scholasticData[getColumnIndex('WJ')];
              }
              break;
            case 20: // Arabic Language / Islamic Values
              if (getSubjectText(20, gradeValue, schoolYearValue).includes("Arabic Language")) {
                q1 = scholasticData[getColumnIndex('TC')];
                q2 = scholasticData[getColumnIndex('TY')];
                q3 = scholasticData[getColumnIndex('UU')];
                q4 = scholasticData[getColumnIndex('VQ')];
                final = scholasticData[getColumnIndex('WM')];
              } else if (getSubjectText(20, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('TD')];
                q2 = scholasticData[getColumnIndex('TZ')];
                q3 = scholasticData[getColumnIndex('UV')];
                q4 = scholasticData[getColumnIndex('VR')];
                final = scholasticData[getColumnIndex('WN')];
              }
              break;
            case 22: // General Average
              q1 = scholasticData[getColumnIndex('TE')];
              q2 = scholasticData[getColumnIndex('UA')];
              q3 = scholasticData[getColumnIndex('UW')];
              q4 = scholasticData[getColumnIndex('VS')];
              final = scholasticData[getColumnIndex('WO')];
              break;
          }
      
          // Sanitize all values
        q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);
      
        // Determine remarks (column 7)
        if (final === "") {
          remarks = "";
        } else
      
          // Determine remarks
          if (rowNumber === 22) {
            if (final === "") {
              remarks = "";
            } else {
              const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
                const rowFinal = getGradeDataBox5(row, gradeValue, schoolYearValue, scholasticData).final;
                return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
              }, 0);
      
              if (failedCount > 2) {
                remarks = "RETAINED";
              } else if (failedCount === 0) {
                remarks = "PROMOTED";
              } else {
                remarks = "REMEDIAL";
              }
            }
          } else {
            remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
          }
      
      
          return { q1, q2, q3, q4, final, remarks };
        } catch (error) {
          
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      }
      
      function getGradeDataBox6(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
          
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        function getColumnIndex(letter) {
          let index = 0;
          for (let i = 0; i < letter.length; i++) {
            index = index * 26 + letter.charCodeAt(i) - 64;
          }
          return index - 1;
        }
      
          switch (rowNumber) {
            case 7: // Mother Tongue
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XU')];
                q2 = scholasticData[getColumnIndex('YQ')];
                q3 = scholasticData[getColumnIndex('ZM')];
                q4 = scholasticData[getColumnIndex('AAI')];
                final = scholasticData[getColumnIndex('ABE')];
              } else if (grade > 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XG')];
                q2 = scholasticData[getColumnIndex('YC')];
                q3 = scholasticData[getColumnIndex('YY')];
                q4 = scholasticData[getColumnIndex('ZU')];
                final = scholasticData[getColumnIndex('AAQ')];
              } else {
                q1 = scholasticData[getColumnIndex('XF')];
                q2 = scholasticData[getColumnIndex('YB')];
                q3 = scholasticData[getColumnIndex('YX')];
                q4 = scholasticData[getColumnIndex('ZT')];
                final = scholasticData[getColumnIndex('AAP')];
              }
              break;
            case 8: // Filipino
              if (grade === 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XV')];
                q2 = scholasticData[getColumnIndex('YR')];
                q3 = scholasticData[getColumnIndex('ZN')];
                q4 = scholasticData[getColumnIndex('AAJ')];
                final = scholasticData[getColumnIndex('ABF')];
              } else if (grade > 1 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XH')];
                q2 = scholasticData[getColumnIndex('YD')];
                q3 = scholasticData[getColumnIndex('YZ')];
                q4 = scholasticData[getColumnIndex('ZV')];
                final = scholasticData[getColumnIndex('AAR')];
              } else {
                q1 = scholasticData[getColumnIndex('XG')];
                q2 = scholasticData[getColumnIndex('YC')];
                q3 = scholasticData[getColumnIndex('YY')];
                q4 = scholasticData[getColumnIndex('ZU')];
                final = scholasticData[getColumnIndex('AAQ')];
              }
              break;
            case 9: // English
              if (grade < 7 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XI')];
                q2 = scholasticData[getColumnIndex('YE')];
                q3 = scholasticData[getColumnIndex('ZA')];
                q4 = scholasticData[getColumnIndex('ZW')];
                final = scholasticData[getColumnIndex('AAS')];
              } else {
                q1 = scholasticData[getColumnIndex('XH')];
                q2 = scholasticData[getColumnIndex('YD')];
                q3 = scholasticData[getColumnIndex('YZ')];
                q4 = scholasticData[getColumnIndex('ZV')];
                final = scholasticData[getColumnIndex('AAR')];
              }
              break;
            case 10: // Mathematics
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  q1 = scholasticData[getColumnIndex('XE')];
                  q2 = scholasticData[getColumnIndex('YA')];
                  q3 = scholasticData[getColumnIndex('YW')];
                  q4 = scholasticData[getColumnIndex('ZS')];
                  final = scholasticData[getColumnIndex('AAO')];
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('XK')];
                  q2 = scholasticData[getColumnIndex('YG')];
                  q3 = scholasticData[getColumnIndex('ZC')];
                  q4 = scholasticData[getColumnIndex('ZY')];
                  final = scholasticData[getColumnIndex('AAU')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('XI')];
                q2 = scholasticData[getColumnIndex('YE')];
                q3 = scholasticData[getColumnIndex('ZA')];
                q4 = scholasticData[getColumnIndex('ZW')];
                final = scholasticData[getColumnIndex('AAS')];
              }
              break;
            case 11: // Science
              if (grade < 7 && schoolYearStart > 2023) {
                q1 = scholasticData[getColumnIndex('XD')];
                q2 = scholasticData[getColumnIndex('XZ')];
                q3 = scholasticData[getColumnIndex('YV')];
                q4 = scholasticData[getColumnIndex('ZR')];
                final = scholasticData[getColumnIndex('AAN')];
              } else {
                q1 = scholasticData[getColumnIndex('XJ')];
                q2 = scholasticData[getColumnIndex('YF')];
                q3 = scholasticData[getColumnIndex('ZB')];
                q4 = scholasticData[getColumnIndex('ZX')];
                final = scholasticData[getColumnIndex('AAT')];
              }
              break;
            case 12: // Araling Panlipunan (AP)
              if (grade < 3 && schoolYearStart > 2023) {
                // Empty string for grades 1-2 after 2023
              } else if (schoolYearStart > 2023 && grade < 7) {
                q1 = scholasticData[getColumnIndex('XJ')];
                q2 = scholasticData[getColumnIndex('YF')];
                q3 = scholasticData[getColumnIndex('ZB')];
                q4 = scholasticData[getColumnIndex('ZX')];
                final = scholasticData[getColumnIndex('AAT')];
              } else {
                q1 = scholasticData[getColumnIndex('XK')];
                q2 = scholasticData[getColumnIndex('YG')];
                q3 = scholasticData[getColumnIndex('ZC')];
                q4 = scholasticData[getColumnIndex('ZY')];
                final = scholasticData[getColumnIndex('AAU')];
              }
              break;
            case 13: // EPP/TLE
              if (schoolYearStart > 2023 && grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('XL')];
                q2 = scholasticData[getColumnIndex('YH')];
                q3 = scholasticData[getColumnIndex('ZD')];
                q4 = scholasticData[getColumnIndex('ZZ')];
                final = scholasticData[getColumnIndex('AAV')];
              }
              break;
            case 14: // MAPEH
              if (schoolYearStart > 2023 && grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('XS')];
                q2 = scholasticData[getColumnIndex('YO')];
                q3 = scholasticData[getColumnIndex('ZK')];
                q4 = scholasticData[getColumnIndex('AAG')];
                final = scholasticData[getColumnIndex('ABC')];
              }
              break;
            case 15: // Music
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('XQ')];
                  q2 = scholasticData[getColumnIndex('YM')];
                  q3 = scholasticData[getColumnIndex('ZI')];
                  q4 = scholasticData[getColumnIndex('AAE')];
                  final = scholasticData[getColumnIndex('ABA')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('XM')];
                q2 = scholasticData[getColumnIndex('YI')];
                q3 = scholasticData[getColumnIndex('ZE')];
                q4 = scholasticData[getColumnIndex('AAA')];
                final = scholasticData[getColumnIndex('AAW')];
              }
              break;
            case 16: // Arts
              if (schoolYearStart > 2023) {
                if (grade < 4) {
                  // Empty string for grades 1-3 after 2023
                } else if (grade >= 4) {
                  q1 = scholasticData[getColumnIndex('XR')];
                  q2 = scholasticData[getColumnIndex('YN')];
                  q3 = scholasticData[getColumnIndex('ZJ')];
                  q4 = scholasticData[getColumnIndex('AAF')];
                  final = scholasticData[getColumnIndex('ABB')];
                }
              } else {
                q1 = scholasticData[getColumnIndex('XN')];
                q2 = scholasticData[getColumnIndex('YJ')];
                q3 = scholasticData[getColumnIndex('ZF')];
                q4 = scholasticData[getColumnIndex('AAB')];
                final = scholasticData[getColumnIndex('AAX')];
              }
              break;
            case 17: // Physical Education
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('XO')];
                q2 = scholasticData[getColumnIndex('YK')];
                q3 = scholasticData[getColumnIndex('ZG')];
                q4 = scholasticData[getColumnIndex('AAC')];
                final = scholasticData[getColumnIndex('AAY')];
              }
              break;
            case 18: // Health
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('XP')];
                q2 = scholasticData[getColumnIndex('YL')];
                q3 = scholasticData[getColumnIndex('ZH')];
                q4 = scholasticData[getColumnIndex('AAD')];
                final = scholasticData[getColumnIndex('AAZ')];
              }
              break;
            case 19: // Edukasyon sa Pagpapakatao
              if (schoolYearStart > 2023 && grade < 7) {
                // Empty string for grades 1-6 after 2023
              } else {
                q1 = scholasticData[getColumnIndex('XT')];
                q2 = scholasticData[getColumnIndex('YP')];
                q3 = scholasticData[getColumnIndex('ZL')];
                q4 = scholasticData[getColumnIndex('AAH')];
                final = scholasticData[getColumnIndex('ABD')];
              }
              break;
            case 20: // Arabic Language / Islamic Values
              if (getSubjectText(20, gradeValue, schoolYearValue).includes("Arabic Language")) {
                q1 = scholasticData[getColumnIndex('XW')];
                q2 = scholasticData[getColumnIndex('YS')];
                q3 = scholasticData[getColumnIndex('ZO')];
                q4 = scholasticData[getColumnIndex('AAK')];
                final = scholasticData[getColumnIndex('ABG')];
              } else if (getSubjectText(20, gradeValue, schoolYearValue).includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('XX')];
                q2 = scholasticData[getColumnIndex('YT')];
                q3 = scholasticData[getColumnIndex('ZP')];
                q4 = scholasticData[getColumnIndex('AAL')];
                final = scholasticData[getColumnIndex('ABH')];
              }
              break;
            case 22: // General Average
              q1 = scholasticData[getColumnIndex('XY')];
              q2 = scholasticData[getColumnIndex('YU')];
              q3 = scholasticData[getColumnIndex('ZQ')];
              q4 = scholasticData[getColumnIndex('AAM')];
              final = scholasticData[getColumnIndex('ABI')];
              break;
          }
      
          // Sanitize all values
        q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);
      
        // Determine remarks (column 7)
        if (final === "") {
          remarks = "";
        } else
        if (rowNumber === 22) {
          if (final === "") {
            remarks = "";
          } else {
            const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
              const rowFinal = getGradeDataBox6(row, gradeValue, schoolYearValue, scholasticData).final;
              return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
            }, 0);
      
            if (failedCount > 2) {
              remarks = "RETAINED";
            } else if (failedCount === 0) {
              remarks = "PROMOTED";
            } else {
              remarks = "REMEDIAL";
            }
          }
        } else {
          remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
        }
      
        
      
        return { q1, q2, q3, q4, final, remarks };
      }
      
      function getGradeDataBox7(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
        
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        function getColumnIndex(letter) {
          let index = 0;
          for (let i = 0; i < letter.length; i++) {
            index = index * 26 + letter.charCodeAt(i) - 64;
          }
          return index - 1;
        }
      
        switch (rowNumber) {
          case 7: // Mother Tongue
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ACO')];
              q2 = scholasticData[getColumnIndex('ADK')];
              q3 = scholasticData[getColumnIndex('AEG')];
              q4 = scholasticData[getColumnIndex('AFC')];
              final = scholasticData[getColumnIndex('AFY')];
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ACA')];
              q2 = scholasticData[getColumnIndex('ACW')];
              q3 = scholasticData[getColumnIndex('ADS')];
              q4 = scholasticData[getColumnIndex('AEO')];
              final = scholasticData[getColumnIndex('AFK')];
            } else {
              q1 = scholasticData[getColumnIndex('ABZ')];
              q2 = scholasticData[getColumnIndex('ACV')];
              q3 = scholasticData[getColumnIndex('ADR')];
              q4 = scholasticData[getColumnIndex('AEN')];
              final = scholasticData[getColumnIndex('AFJ')];
            }
            break;
          case 8: // Filipino
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ACP')];
              q2 = scholasticData[getColumnIndex('ADL')];
              q3 = scholasticData[getColumnIndex('AEH')];
              q4 = scholasticData[getColumnIndex('AFD')];
              final = scholasticData[getColumnIndex('AFZ')];
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ACB')];
              q2 = scholasticData[getColumnIndex('ACX')];
              q3 = scholasticData[getColumnIndex('ADT')];
              q4 = scholasticData[getColumnIndex('AEP')];
              final = scholasticData[getColumnIndex('AFL')];
            } else {
              q1 = scholasticData[getColumnIndex('ACA')];
              q2 = scholasticData[getColumnIndex('ACW')];
              q3 = scholasticData[getColumnIndex('ADS')];
              q4 = scholasticData[getColumnIndex('AEO')];
              final = scholasticData[getColumnIndex('AFK')];
            }
            break;
          case 9: // English
            if (grade < 7 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ACC')];
              q2 = scholasticData[getColumnIndex('ACY')];
              q3 = scholasticData[getColumnIndex('ADU')];
              q4 = scholasticData[getColumnIndex('AEQ')];
              final = scholasticData[getColumnIndex('AFM')];
            } else {
              q1 = scholasticData[getColumnIndex('ACB')];
              q2 = scholasticData[getColumnIndex('ACX')];
              q3 = scholasticData[getColumnIndex('ADT')];
              q4 = scholasticData[getColumnIndex('AEP')];
              final = scholasticData[getColumnIndex('AFL')];
            }
            break;
          case 10: // Mathematics
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                q1 = scholasticData[getColumnIndex('ABY')];
                q2 = scholasticData[getColumnIndex('ACU')];
                q3 = scholasticData[getColumnIndex('ADQ')];
                q4 = scholasticData[getColumnIndex('AEM')];
                final = scholasticData[getColumnIndex('AFI')];
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('ACE')];
                q2 = scholasticData[getColumnIndex('ADA')];
                q3 = scholasticData[getColumnIndex('ADW')];
                q4 = scholasticData[getColumnIndex('AES')];
                final = scholasticData[getColumnIndex('AFO')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('ACC')];
              q2 = scholasticData[getColumnIndex('ACY')];
              q3 = scholasticData[getColumnIndex('ADU')];
              q4 = scholasticData[getColumnIndex('AEQ')];
              final = scholasticData[getColumnIndex('AFM')];
            }
            break;
          case 11: // Science
            if (grade < 7 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('ABX')];
              q2 = scholasticData[getColumnIndex('ACT')];
              q3 = scholasticData[getColumnIndex('ADP')];
              q4 = scholasticData[getColumnIndex('AEL')];
              final = scholasticData[getColumnIndex('AFH')];
            } else {
              q1 = scholasticData[getColumnIndex('ACD')];
              q2 = scholasticData[getColumnIndex('ACZ')];
              q3 = scholasticData[getColumnIndex('ADV')];
              q4 = scholasticData[getColumnIndex('AER')];
              final = scholasticData[getColumnIndex('AFN')];
            }
            break;
          case 12: // Araling Panlipunan (AP)
            if (grade < 3 && schoolYearStart > 2023) {
              q1 = q2 = q3 = q4 = final = "";
            } else if (schoolYearStart > 2023 && grade < 7) {
              q1 = scholasticData[getColumnIndex('ACD')];
              q2 = scholasticData[getColumnIndex('ACZ')];
              q3 = scholasticData[getColumnIndex('ADV')];
              q4 = scholasticData[getColumnIndex('AER')];
              final = scholasticData[getColumnIndex('AFN')];
            } else {
              q1 = scholasticData[getColumnIndex('ACE')];
              q2 = scholasticData[getColumnIndex('ADA')];
              q3 = scholasticData[getColumnIndex('ADW')];
              q4 = scholasticData[getColumnIndex('AES')];
              final = scholasticData[getColumnIndex('AFO')];
            }
            break;
          case 13: // Edukasyon sa Pagpapakatao (EsP)
            if (schoolYearStart > 2023 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('ACF')];
              q2 = scholasticData[getColumnIndex('ADB')];
              q3 = scholasticData[getColumnIndex('ADX')];
              q4 = scholasticData[getColumnIndex('AET')];
              final = scholasticData[getColumnIndex('AFP')];
            }
            break;
          case 14: // Music
            if (schoolYearStart > 2023 && grade < 4) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('ACM')];
              q2 = scholasticData[getColumnIndex('ADI')];
              q3 = scholasticData[getColumnIndex('AEE')];
              q4 = scholasticData[getColumnIndex('AFA')];
              final = scholasticData[getColumnIndex('AFW')];
            }
            break;
          case 15: // Arts
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('ACK')];
                q2 = scholasticData[getColumnIndex('ADG')];
                q3 = scholasticData[getColumnIndex('AEC')];
                q4 = scholasticData[getColumnIndex('AEY')];
                final = scholasticData[getColumnIndex('AFU')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('ACG')];
              q2 = scholasticData[getColumnIndex('ADC')];
              q3 = scholasticData[getColumnIndex('ADY')];
              q4 = scholasticData[getColumnIndex('AEU')];
              final = scholasticData[getColumnIndex('AFQ')];
            }
            break;
          case 16: // Physical Education
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                q1 = q2 = q3 = q4 = final = "";
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('ACL')];
                q2 = scholasticData[getColumnIndex('ADH')];
                q3 = scholasticData[getColumnIndex('AED')];
                q4 = scholasticData[getColumnIndex('AEZ')];
                final = scholasticData[getColumnIndex('AFV')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('ACH')];
              q2 = scholasticData[getColumnIndex('ADD')];
              q3 = scholasticData[getColumnIndex('ADZ')];
              q4 = scholasticData[getColumnIndex('AEV')];
              final = scholasticData[getColumnIndex('AFR')];
            }
            break;
          case 17: // Health
            if (schoolYearStart > 2023 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('ACI')];
              q2 = scholasticData[getColumnIndex('ADE')];
              q3 = scholasticData[getColumnIndex('AEA')];
              q4 = scholasticData[getColumnIndex('AEW')];
              final = scholasticData[getColumnIndex('AFS')];
            }
            break;
          case 18: // Edukasyong Pantahanan at Pangkabuhayan (EPP) / Technology and Livelihood Education (TLE)
            if (schoolYearStart > 2023 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('ACJ')];
              q2 = scholasticData[getColumnIndex('ADF')];
              q3 = scholasticData[getColumnIndex('AEB')];
              q4 = scholasticData[getColumnIndex('AEX')];
              final = scholasticData[getColumnIndex('AFT')];
            }
            break;
          case 19: // Edukasyon sa Pagpapakatao
            if (schoolYearStart > 2023 && grade < 7) {
              q1 = q2 = q3 = q4 = final = "";
            } else {
              q1 = scholasticData[getColumnIndex('ACN')];
              q2 = scholasticData[getColumnIndex('ADJ')];
              q3 = scholasticData[getColumnIndex('AEF')];
              q4 = scholasticData[getColumnIndex('AFB')];
              final = scholasticData[getColumnIndex('AFX')];
            }
            break;
          
            case 20:
            {
              const subjectText = getSubjectText(20, gradeValue, schoolYearValue);
              if (subjectText.includes("Arabic Language")) {
                q1 = scholasticData[getColumnIndex('ACQ')];
                q2 = scholasticData[getColumnIndex('ADM')];
                q3 = scholasticData[getColumnIndex('AEI')];
                q4 = scholasticData[getColumnIndex('AFE')];
                final = scholasticData[getColumnIndex('AGA')];
              }
            }
            break;
          case 21:
            {
              const subjectText = getSubjectText(21, gradeValue, schoolYearValue);
              if (subjectText.includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('ACR')];
                q2 = scholasticData[getColumnIndex('ADN')];
                q3 = scholasticData[getColumnIndex('AEJ')];
                q4 = scholasticData[getColumnIndex('AFF')];
                final = scholasticData[getColumnIndex('AGB')];
              }
            }
            break;
          case 22:
            {
              const subjectText = getSubjectText(22, gradeValue, schoolYearValue);
              if (subjectText.includes("General Average")) {
                q1 = scholasticData[getColumnIndex('ACS')];
                q2 = scholasticData[getColumnIndex('ADO')];
                q3 = scholasticData[getColumnIndex('AEK')];
                q4 = scholasticData[getColumnIndex('AFG')];
                final = scholasticData[getColumnIndex('AGC')];
              }
            }
            break;
        }
      
        // Sanitize all values
        q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);
      
        // Determine remarks (column 7)
        if (final === "") {
          remarks = "";
        } else
        if (rowNumber === 22) {
          if (final === "") {
            remarks = "";
          } else {
            const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
              const rowFinal = getGradeDataBox7(row, gradeValue, schoolYearValue, scholasticData).final;
              return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
            }, 0);
      
            if (failedCount > 2) {
              remarks = "RETAINED";
            } else if (failedCount === 0) {
              remarks = "PROMOTED";
            } else {
              remarks = "REMEDIAL";
            }
          }
        } else {
          remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
        }
      
        
      
        return { q1, q2, q3, q4, final, remarks };
      }
      
      function getGradeDataBox8(rowNumber, gradeValue, schoolYearValue, scholasticData) {
        
        
        if (isEmpty(gradeValue) || isEmpty(schoolYearValue)) {
        
          return { q1: '', q2: '', q3: '', q4: '', final: '', remarks: '' };
        }
      
        const schoolYearStart = parseInt(schoolYearValue.substring(0, 4), 10);
        const grade = parseInt(gradeValue, 10);
        const sanitizeValue = (value) => (value === undefined || value === null || value === '') ? '' : value;
      
      
        let q1 = '', q2 = '', q3 = '', q4 = '', final = '', remarks = '';
      
        function getColumnIndex(letter) {
          let index = 0;
          for (let i = 0; i < letter.length; i++) {
            index = index * 26 + letter.charCodeAt(i) - 64;
          }
          return index - 1;
        }
      
        switch (rowNumber) {
          case 7:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AHI')];
              q2 = scholasticData[getColumnIndex('AIE')];
              q3 = scholasticData[getColumnIndex('AJA')];
              q4 = scholasticData[getColumnIndex('AJW')];
              final = scholasticData[getColumnIndex('AKS')];
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AGU')];
              q2 = scholasticData[getColumnIndex('AHQ')];
              q3 = scholasticData[getColumnIndex('AIM')];
              q4 = scholasticData[getColumnIndex('AJI')];
              final = scholasticData[getColumnIndex('AKE')];
            } else {
              q1 = scholasticData[getColumnIndex('AGT')];
              q2 = scholasticData[getColumnIndex('AHP')];
              q3 = scholasticData[getColumnIndex('AIL')];
              q4 = scholasticData[getColumnIndex('AJH')];
              final = scholasticData[getColumnIndex('AKD')];
            }
            break;
          case 8:
            if (grade === 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AHJ')];
              q2 = scholasticData[getColumnIndex('AIF')];
              q3 = scholasticData[getColumnIndex('AJB')];
              q4 = scholasticData[getColumnIndex('AJX')];
              final = scholasticData[getColumnIndex('AKT')];
            } else if (grade > 1 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AGV')];
              q2 = scholasticData[getColumnIndex('AHR')];
              q3 = scholasticData[getColumnIndex('AIN')];
              q4 = scholasticData[getColumnIndex('AJJ')];
              final = scholasticData[getColumnIndex('AKF')];
            } else {
              q1 = scholasticData[getColumnIndex('AGU')];
              q2 = scholasticData[getColumnIndex('AHQ')];
              q3 = scholasticData[getColumnIndex('AIM')];
              q4 = scholasticData[getColumnIndex('AJI')];
              final = scholasticData[getColumnIndex('AKE')];
            }
            break;
            case 9:
            if (grade < 7 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AGW')];
              q2 = scholasticData[getColumnIndex('AHS')];
              q3 = scholasticData[getColumnIndex('AIO')];
              q4 = scholasticData[getColumnIndex('AJK')];
              final = scholasticData[getColumnIndex('AKG')];
            } else {
              q1 = scholasticData[getColumnIndex('AGV')];
              q2 = scholasticData[getColumnIndex('AHR')];
              q3 = scholasticData[getColumnIndex('AIN')];
              q4 = scholasticData[getColumnIndex('AJJ')];
              final = scholasticData[getColumnIndex('AKF')];
            }
            break;
          case 10:
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                q1 = scholasticData[getColumnIndex('AGS')];
                q2 = scholasticData[getColumnIndex('AHO')];
                q3 = scholasticData[getColumnIndex('AIK')];
                q4 = scholasticData[getColumnIndex('AJG')];
                final = scholasticData[getColumnIndex('AKC')];
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('AGY')];
                q2 = scholasticData[getColumnIndex('AHU')];
                q3 = scholasticData[getColumnIndex('AIQ')];
                q4 = scholasticData[getColumnIndex('AJM')];
                final = scholasticData[getColumnIndex('AKI')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('AGW')];
              q2 = scholasticData[getColumnIndex('AHS')];
              q3 = scholasticData[getColumnIndex('AIO')];
              q4 = scholasticData[getColumnIndex('AJK')];
              final = scholasticData[getColumnIndex('AKG')];
            }
            break;
          case 11:
            if (grade < 7 && schoolYearStart > 2023) {
              q1 = scholasticData[getColumnIndex('AGR')];
              q2 = scholasticData[getColumnIndex('AHN')];
              q3 = scholasticData[getColumnIndex('AIJ')];
              q4 = scholasticData[getColumnIndex('AJF')];
              final = scholasticData[getColumnIndex('AKB')];
            } else {
              q1 = scholasticData[getColumnIndex('AGX')];
              q2 = scholasticData[getColumnIndex('AHT')];
              q3 = scholasticData[getColumnIndex('AIP')];
              q4 = scholasticData[getColumnIndex('AJL')];
              final = scholasticData[getColumnIndex('AKH')];
            }
            break;
          case 12:
            if (grade < 3 && schoolYearStart > 2023) {
              // Empty string for grades 1-2 after 2023
            } else if (schoolYearStart > 2023 && grade < 7) {
              q1 = scholasticData[getColumnIndex('AGX')];
              q2 = scholasticData[getColumnIndex('AHT')];
              q3 = scholasticData[getColumnIndex('AIP')];
              q4 = scholasticData[getColumnIndex('AJL')];
              final = scholasticData[getColumnIndex('AKH')];
            } else {
              q1 = scholasticData[getColumnIndex('AGY')];
              q2 = scholasticData[getColumnIndex('AHU')];
              q3 = scholasticData[getColumnIndex('AIQ')];
              q4 = scholasticData[getColumnIndex('AJM')];
              final = scholasticData[getColumnIndex('AKI')];
            }
            break;
          case 13:
            if (schoolYearStart > 2023 && grade < 4) {
              // Empty string for grades 1-3 after 2023
            } else {
              q1 = scholasticData[getColumnIndex('AGZ')];
              q2 = scholasticData[getColumnIndex('AHV')];
              q3 = scholasticData[getColumnIndex('AIR')];
              q4 = scholasticData[getColumnIndex('AJN')];
              final = scholasticData[getColumnIndex('AKJ')];
            }
            break;
          case 14:
            if (schoolYearStart > 2023 && grade < 4) {
              // Empty string for grades 1-3 after 2023
            } else {
              q1 = scholasticData[getColumnIndex('AHG')];
              q2 = scholasticData[getColumnIndex('AIC')];
              q3 = scholasticData[getColumnIndex('AIY')];
              q4 = scholasticData[getColumnIndex('AJU')];
              final = scholasticData[getColumnIndex('AKQ')];
            }
            break;
          case 15:
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('AHE')];
                q2 = scholasticData[getColumnIndex('AIA')];
                q3 = scholasticData[getColumnIndex('AIW')];
                q4 = scholasticData[getColumnIndex('AJS')];
                final = scholasticData[getColumnIndex('AKO')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('AHA')];
              q2 = scholasticData[getColumnIndex('AHW')];
              q3 = scholasticData[getColumnIndex('AIS')];
              q4 = scholasticData[getColumnIndex('AJO')];
              final = scholasticData[getColumnIndex('AKK')];
            }
            break;
          case 16:
            if (schoolYearStart > 2023) {
              if (grade < 4) {
                // Empty string for grades 1-3 after 2023
              } else if (grade >= 4) {
                q1 = scholasticData[getColumnIndex('AHF')];
                q2 = scholasticData[getColumnIndex('AIB')];
                q3 = scholasticData[getColumnIndex('AIX')];
                q4 = scholasticData[getColumnIndex('AJT')];
                final = scholasticData[getColumnIndex('AKP')];
              }
            } else {
              q1 = scholasticData[getColumnIndex('AHB')];
              q2 = scholasticData[getColumnIndex('AHX')];
              q3 = scholasticData[getColumnIndex('AIT')];
              q4 = scholasticData[getColumnIndex('AJP')];
              final = scholasticData[getColumnIndex('AKL')];
            }
            break;
          case 17:
            if (schoolYearStart > 2023 && grade < 7) {
              // Empty string for grades 1-6 after 2023
            } else {
              q1 = scholasticData[getColumnIndex('AHC')];
              q2 = scholasticData[getColumnIndex('AHY')];
              q3 = scholasticData[getColumnIndex('AIU')];
              q4 = scholasticData[getColumnIndex('AJQ')];
              final = scholasticData[getColumnIndex('AKM')];
            }
            break;
          case 18:
            if (schoolYearStart > 2023 && grade < 7) {
              // Empty string for grades 1-6 after 2023
            } else {
              q1 = scholasticData[getColumnIndex('AHD')];
              q2 = scholasticData[getColumnIndex('AHZ')];
              q3 = scholasticData[getColumnIndex('AIV')];
              q4 = scholasticData[getColumnIndex('AJR')];
              final = scholasticData[getColumnIndex('AKN')];
            }
            break;
          case 19:
            if (schoolYearStart > 2023 && grade < 7) {
              // Empty string for grades 1-6 after 2023
            } else {
              q1 = scholasticData[getColumnIndex('AHH')];
              q2 = scholasticData[getColumnIndex('AID')];
              q3 = scholasticData[getColumnIndex('AIZ')];
              q4 = scholasticData[getColumnIndex('AJV')];
              final = scholasticData[getColumnIndex('AKR')];
            }
            break;
          case 20:
            {
              const subjectText = getSubjectText(20, gradeValue, schoolYearValue);
              if (subjectText.includes("Arabic Language")) {
                q1 = scholasticData[getColumnIndex('AHK')];
                q2 = scholasticData[getColumnIndex('AIG')];
                q3 = scholasticData[getColumnIndex('AJC')];
                q4 = scholasticData[getColumnIndex('AJY')];
                final = scholasticData[getColumnIndex('AKU')];
              }
            }
            break;
          case 21:
            {
              const subjectText = getSubjectText(21, gradeValue, schoolYearValue);
              if (subjectText.includes("Islamic Values Education")) {
                q1 = scholasticData[getColumnIndex('AHL')];
                q2 = scholasticData[getColumnIndex('AIH')];
                q3 = scholasticData[getColumnIndex('AJD')];
                q4 = scholasticData[getColumnIndex('AJZ')];
                final = scholasticData[getColumnIndex('AKV')];
              }
            }
            break;
          case 22:
            {
              const subjectText = getSubjectText(22, gradeValue, schoolYearValue);
              if (subjectText.includes("General Average")) {
                q1 = scholasticData[getColumnIndex('AHM')];
                q2 = scholasticData[getColumnIndex('AII')];
                q3 = scholasticData[getColumnIndex('AJE')];
                q4 = scholasticData[getColumnIndex('AKA')];
                final = scholasticData[getColumnIndex('AKW')];
              }
            }
            break;
        }
      
        // Sanitize all values
        q1 = sanitizeValue(q1);
        q2 = sanitizeValue(q2);
        q3 = sanitizeValue(q3);
        q4 = sanitizeValue(q4);
        final = sanitizeValue(final);
      
        // Determine remarks (column 7)
        if (final === "") {
          remarks = "";
        } else
        if (rowNumber === 22) {
          if (final === "") {
            remarks = "";
          } else {
            const failedCount = [7, 8, 9, 10, 11, 12, 13, 14, 18].reduce((count, row) => {
              const rowFinal = getGradeDataBox8(row, gradeValue, schoolYearValue, scholasticData).final;
              return count + (rowFinal !== "" && parseFloat(rowFinal) < 75 ? 1 : 0);
            }, 0);
      
            if (failedCount > 2) {
              remarks = "RETAINED";
            } else if (failedCount === 0) {
              remarks = "PROMOTED";
            } else {
              remarks = "REMEDIAL";
            }
          }
        } else {
          remarks = final === "" ? "" : (parseFloat(final) < 75 ? "FAILED" : "PASSED");
        }
      
        return { q1, q2, q3, q4, final, remarks };
      }
