// pag animate sin mga patta    
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
    
    
    // mga istyle sin mga pattta
    for (let i = 1; i <= 14; i++) {
        let layer = document.getElementById(`layer${i}`);
        if (layer) {
            layer.style.transition = 'opacity 0.5s ease, left 0.5s ease';
        }
    }
    
    // mga istyle sin mga pattta
    for (let i = 1; i <= 14; i++) {
        let layer = document.getElementById(`layer${i}`);
        if (layer) {
            layer.style.transition = 'opacity 0.5s ease-out, left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)';
        }
    }
    
    // panagnaan istyle sin ika hamputag-upat patta
    layer14.style.opacity = '0';
    
    window.addEventListener('scroll', () => {
        let value = window.scrollY;
        let windowWidth = window.innerWidth;
        
        for (let i = 2; i <= 14; i++) {
            let layer = document.getElementById(`layer${i}`);
            if (layer) {
                let moveDistance = value * 10;
                let opacity = 1;

                if (i <= 10) {
                    layer.style.left = `-${moveDistance}px`;
                    opacity = Math.max(0, 1 - (moveDistance / windowWidth));
                } else if (i <= 13) {
                    layer.style.left = `${moveDistance}px`;
                    opacity = Math.max(0, 1 - (moveDistance / windowWidth));
                } else if (i === 14) {
                    opacity = Math.min(value / 100, 1);  
                }
                layer.style.opacity = opacity;
            }
        }
        // bang agaran sin mga text
        if (text) {
            let opacity = Math.max(0, 1 - value / 100);
            text.style.opacity = opacity;
        }
    });

    function processData(dataRow) {
        return {
            name: dataRow[0], // hatatkala in ngan dayn ha panagnaan bahagi
            id: dataRow[5],   // hatatkala in ID ha ika-unum
        };
    }
    
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
          }, 3000); // hitapuk in mga notif puas 3 seconds
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
            const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/15G-OHD5QnTKrVgwTAxr2ukWgRC81RyF4k1FEcXXlQIQ/values/%27Learner%20Profiles%27!B3:AP?key=AIzaSyBc93X-MxPnJT6szhelvB2CrDS5t1DEo5o';
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
                    // dayn ha source
                    const [profileResponse, scholasticResponse, helperSheetResponse] = await Promise.all([
                        fetch(`https://sheets.googleapis.com/v4/spreadsheets/15G-OHD5QnTKrVgwTAxr2ukWgRC81RyF4k1FEcXXlQIQ/values/'Learner Profiles'!B3:AP?key=AIzaSyBc93X-MxPnJT6szhelvB2CrDS5t1DEo5o`),
                        fetch(`https://sheets.googleapis.com/v4/spreadsheets/15G-OHD5QnTKrVgwTAxr2ukWgRC81RyF4k1FEcXXlQIQ/values/'ECCD Masterlist Results'!A2:HL?key=AIzaSyBc93X-MxPnJT6szhelvB2CrDS5t1DEo5o`),
                        fetch(`https://sheets.googleapis.com/v4/spreadsheets/15G-OHD5QnTKrVgwTAxr2ukWgRC81RyF4k1FEcXXlQIQ/values/'ECCD Helper Sheet Results'!E:BG?key=AIzaSyBc93X-MxPnJT6szhelvB2CrDS5t1DEo5o`)
                    ]);
            
                    const profileData = await profileResponse.json();
                    const scholasticData = await scholasticResponse.json();
                    const helperSheetData = await helperSheetResponse.json();
            
                    const filteredProfileData = profileData.values.filter(row => row[0].trim().toLowerCase().includes(searchInput.trim().toLowerCase()));
                    const filteredScholasticData = scholasticData.values.find(row => row[0].trim().toLowerCase().includes(searchInput.trim().toLowerCase()));
                    const filteredHelperData = helperSheetData.values.find(row => row[0].trim().toLowerCase().includes(searchInput.trim().toLowerCase()));
            
                    if (filteredProfileData.length > 0) {
                        const fullName = filteredProfileData[0][0];
                        const yrsOld = filteredProfileData[0][8];
                        const lrnNumber = filteredProfileData[0][5];
                        const birthday = filteredProfileData[0][6];
                        const gender = filteredProfileData[0][7];
                        const syStart = filteredProfileData[0][28];
                        const syEnd = filteredProfileData[0][31];
                        const syYear = `${syStart}-${syEnd}`;
                        const adviserName = filteredProfileData[0][32];
                        const principalName = filteredProfileData[0][34];
                        const syStartMonth = filteredProfileData[0][26];
                        const syEndtMonth = filteredProfileData[0][29];
                        const systartDay = filteredProfileData[0][27];  // Renamed to consistent variable
                        const syEndDay = filteredProfileData[0][30];
                        
                        // Filter helper sheet data for the search input
                        const filteredHelperData = helperSheetData.values.find(row => row[0].trim().toLowerCase().includes(searchInput.trim().toLowerCase()));
            
                        // Extract birth date info from helper sheet if available
                        const birthYear = filteredHelperData ? filteredHelperData[2] : "N/A";
                        const birthMonth = filteredHelperData ? filteredHelperData[3] : "N/A";
                        const birthDay = filteredHelperData ? filteredHelperData[4] : "N/A";
                        const grossMotorRsFirst = filteredHelperData ? filteredHelperData[19] : "N/A";
                        const grossMotorSsFirst = filteredHelperData ? filteredHelperData[20] : "N/A";
                        const grossMotorRsSecond = filteredHelperData ? filteredHelperData[37] : "N/A";
                        const grossMotorSsSecond = filteredHelperData ? filteredHelperData[38] : "N/A";
                        const fineMotorRsFirst = filteredHelperData ? filteredHelperData[21] : "N/A";
                        const fineMotorSsFirst = filteredHelperData ? filteredHelperData[22] : "N/A";
                        const fineMotorRsSecond = filteredHelperData ? filteredHelperData[39] : "N/A";
                        const fineMotorSsSecond = filteredHelperData ? filteredHelperData[40] : "N/A";
                        const selfHelpRsFirst = filteredHelperData ? filteredHelperData[23] : "N/A";
                        const selfhelpSsFirst = filteredHelperData ? filteredHelperData[24] : "N/A";
                        const selfhelpRsSecond = filteredHelperData ? filteredHelperData[41] : "N/A";
                        const selfhelpSsSecond = filteredHelperData ? filteredHelperData[42] : "N/A";
                        const receptiveLanguageRsFirst = filteredHelperData ? filteredHelperData[25] : "N/A";
                        const receptiveLanguageSsFirst = filteredHelperData ? filteredHelperData[26] : "N/A";
                        const receptiveLanguageRsSecond = filteredHelperData ? filteredHelperData[43] : "N/A";
                        const receptiveLanguageSsSecond = filteredHelperData ? filteredHelperData[44] : "N/A";
                        const expressiveLanguageRsFirst = filteredHelperData ? filteredHelperData[27] : "N/A";
                        const expressiveLanguageSsFirst = filteredHelperData ? filteredHelperData[28] : "N/A";
                        const expressiveLanguageRsSecond = filteredHelperData ? filteredHelperData[45] : "N/A";
                        const expressiveLanguageSsSecond = filteredHelperData ? filteredHelperData[46] : "N/A";
                        const cognitiveRsFirst = filteredHelperData ? filteredHelperData[29] : "N/A";
                        const cognitiveSsFirst = filteredHelperData ? filteredHelperData[30] : "N/A";
                        const cognitiveRsSecond = filteredHelperData ? filteredHelperData[47] : "N/A";
                        const cognitiveSsSecond = filteredHelperData ? filteredHelperData[48] : "N/A";
                        const socioEmotionalRsFirst = filteredHelperData ? filteredHelperData[31] : "N/A";
                        const socioEmotionalSsFirst = filteredHelperData ? filteredHelperData[32] : "N/A";
                        const socioEmotionalRsSecond = filteredHelperData ? filteredHelperData[49] : "N/A";
                        const socioEmotionalSsSecond = filteredHelperData ? filteredHelperData[50] : "N/A";
                        const firstStandardScoreValue = filteredHelperData ? filteredHelperData[34] : "N/A";
                        const secondStandardScoreValue = filteredHelperData ? filteredHelperData[52] : "N/A";
                        const interpretationFirstStandardScoreValue = filteredHelperData ? filteredHelperData[36] : "N/A";
                        const interpretationSecondStandardScoreValue = filteredHelperData ? filteredHelperData[54] : "N/A";
            
                        // Calculate age values
                        const ChildAgeInYears = calculateAge(birthYear, birthMonth, birthDay, syStart, syStartMonth, systartDay, 'Y') || "N/A";
                        const ChildAgeRemainMonths = calculateAge(birthYear, birthMonth, birthDay, syStart, syStartMonth, systartDay, 'YM') || "N/A";
                        const ChildAgeRemainDays = calculateAge(birthYear, birthMonth, birthDay, syStart, syStartMonth, systartDay, 'MD') || "N/A";
            
                        // Calculate age at end (EoSY)
                        const ChildAgeInYearsEnd = calculateAge(birthYear, birthMonth, birthDay, syEnd, syEndtMonth, syEndDay, 'Y') || "N/A";
                        const ChildAgeRemainMonthsEnd = calculateAge(birthYear, birthMonth, birthDay, syEnd, syEndtMonth, syEndDay, 'YM') || "N/A";
                        const ChildAgeRemainDaysEnd = calculateAge(birthYear, birthMonth, birthDay, syEnd, syEndtMonth, syEndDay, 'MD') || "N/A";
            
                        // Total sum of Scaled Scores in First Assessment
                        const firstScaledScoreTotalSum = Number(grossMotorSsFirst) + 
                                                            Number(fineMotorSsFirst) + 
                                                            Number(selfhelpSsFirst) + 
                                                            Number(receptiveLanguageSsFirst) + 
                                                            Number(expressiveLanguageSsFirst) + 
                                                            Number(cognitiveSsFirst) + 
                                                            Number(socioEmotionalSsFirst);
                        // Total sum of Scaled Scores in Second Assessment
                        const secondScaledScoreTotalSum = Number(grossMotorSsSecond) + 
                                                            Number(fineMotorSsSecond) + 
                                                            Number(selfhelpSsSecond) + 
                                                            Number(receptiveLanguageSsSecond) + 
                                                            Number(expressiveLanguageSsSecond) + 
                                                            Number(cognitiveSsSecond) + 
                                                            Number(socioEmotionalSsSecond);
            
            
                        // Simple conditional to determine "X" or "∙" based on grossMotorSsFirst
                        const gmBosySymbolOne = Number(grossMotorSsFirst) === 1 ? "X" : "∙"; const gmBosySymbolTwo = Number(grossMotorSsFirst) === 2 ? "X" : "∙"; const gmBosySymbolThree = Number(grossMotorSsFirst) === 3 ? "X" : "∙";
                        const gmBosySymbolFour = Number(grossMotorSsFirst) === 4 ? "X" : "∙"; const gmBosySymbolFive = Number(grossMotorSsFirst) === 5 ? "X" : "∙"; const gmBosySymbolSix = Number(grossMotorSsFirst) === 6 ? "X" : "∙";
                        const gmBosySymbolSeven = Number(grossMotorSsFirst) === 7 ? "X" : "∙"; const gmBosySymbolEight = Number(grossMotorSsFirst) === 8 ? "X" : "∙"; const gmBosySymbolNine = Number(grossMotorSsFirst) === 9 ? "X" : "∙";
                        const gmBosySymbolTen = Number(grossMotorSsFirst) === 10 ? "X" : "∙"; const gmBosySymbolEleven = Number(grossMotorSsFirst) === 11 ? "X" : "∙"; const gmBosySymbolTwelve = Number(grossMotorSsFirst) === 12 ? "X" : "∙";
                        const gmBosySymbolThirteen = Number(grossMotorSsFirst) === 13 ? "X" : "∙"; const gmBosySymbolFourteen = Number(grossMotorSsFirst) === 14 ? "X" : "∙"; const gmBosySymbolFifteen = Number(grossMotorSsFirst) === 15 ? "X" : "∙";
                        const gmBosySymbolSixteen = Number(grossMotorSsFirst) === 16 ? "X" : "∙"; const gmBosySymbolSeventeen = Number(grossMotorSsFirst) === 17 ? "X" : "∙"; const gmBosySymbolEighteen = Number(grossMotorSsFirst) === 18 ? "X" : "∙"; const gmBosySymbolNineteen = Number(grossMotorSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on fineMotorSsFirst
                        const fmBosySymbolOne = Number(fineMotorSsFirst) === 1 ? "X" : "∙"; const fmBosySymbolTwo = Number(fineMotorSsFirst) === 2 ? "X" : "∙"; const fmBosySymbolThree = Number(fineMotorSsFirst) === 3 ? "X" : "∙"; const fmBosySymbolFour = Number(fineMotorSsFirst) === 4 ? "X" : "∙";
                        const fmBosySymbolFive = Number(fineMotorSsFirst) === 5 ? "X" : "∙"; const fmBosySymbolSix = Number(fineMotorSsFirst) === 6 ? "X" : "∙"; const fmBosySymbolSeven = Number(fineMotorSsFirst) === 7 ? "X" : "∙";
                        const fmBosySymbolEight = Number(fineMotorSsFirst) === 8 ? "X" : "∙"; const fmBosySymbolNine = Number(fineMotorSsFirst) === 9 ? "X" : "∙"; const fmBosySymbolTen = Number(fineMotorSsFirst) === 10 ? "X" : "∙"; 
                        const fmBosySymbolEleven = Number(fineMotorSsFirst) === 11 ? "X" : "∙"; const fmBosySymbolTwelve = Number(fineMotorSsFirst) === 12 ? "X" : "∙"; const fmBosySymbolThirteen = Number(fineMotorSsFirst) === 13 ? "X" : "∙"; 
                        const fmBosySymbolFourteen = Number(fineMotorSsFirst) === 14 ? "X" : "∙"; const fmBosySymbolFifteen = Number(fineMotorSsFirst) === 15 ? "X" : "∙"; const fmBosySymbolSixteen = Number(fineMotorSsFirst) === 16 ? "X" : "∙"; 
                        const fmBosySymbolSeventeen = Number(fineMotorSsFirst) === 17 ? "X" : "∙"; const fmBosySymbolEighteen = Number(fineMotorSsFirst) === 18 ? "X" : "∙"; const fmBosySymbolNineteen = Number(fineMotorSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on selfhelpSsFirst
                        const shBosySymbolOne = Number(selfhelpSsFirst) === 1 ? "X" : "∙"; const shBosySymbolTwo = Number(selfhelpSsFirst) === 2 ? "X" : "∙"; const shBosySymbolThree = Number(selfhelpSsFirst) === 3 ? "X" : "∙"; const shBosySymbolFour = Number(selfhelpSsFirst) === 4 ? "X" : "∙";
                        const shBosySymbolFive = Number(selfhelpSsFirst) === 5 ? "X" : "∙"; const shBosySymbolSix = Number(selfhelpSsFirst) === 6 ? "X" : "∙"; const shBosySymbolSeven = Number(selfhelpSsFirst) === 7 ? "X" : "∙";
                        const shBosySymbolEight = Number(selfhelpSsFirst) === 8 ? "X" : "∙"; const shBosySymbolNine = Number(selfhelpSsFirst) === 9 ? "X" : "∙"; const shBosySymbolTen = Number(selfhelpSsFirst) === 10 ? "X" : "∙";
                        const shBosySymbolEleven = Number(selfhelpSsFirst) === 11 ? "X" : "∙"; const shBosySymbolTwelve = Number(selfhelpSsFirst) === 12 ? "X" : "∙"; const shBosySymbolThirteen = Number(selfhelpSsFirst) === 13 ? "X" : "∙";
                        const shBosySymbolFourteen = Number(selfhelpSsFirst) === 14 ? "X" : "∙"; const shBosySymbolFifteen = Number(selfhelpSsFirst) === 15 ? "X" : "∙"; const shBosySymbolSixteen = Number(selfhelpSsFirst) === 16 ? "X" : "∙";
                        const shBosySymbolSeventeen = Number(selfhelpSsFirst) === 17 ? "X" : "∙"; const shBosySymbolEighteen = Number(selfhelpSsFirst) === 18 ? "X" : "∙"; const shBosySymbolNineteen = Number(selfhelpSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on receptiveLanguageSsFirst
                        const rlBosySymbolOne = Number(receptiveLanguageSsFirst) === 1 ? "X" : "∙"; const rlBosySymbolTwo = Number(receptiveLanguageSsFirst) === 2 ? "X" : "∙"; const rlBosySymbolThree = Number(receptiveLanguageSsFirst) === 3 ? "X" : "∙"; const rlBosySymbolFour = Number(receptiveLanguageSsFirst) === 4 ? "X" : "∙";
                        const rlBosySymbolFive = Number(receptiveLanguageSsFirst) === 5 ? "X" : "∙"; const rlBosySymbolSix = Number(receptiveLanguageSsFirst) === 6 ? "X" : "∙"; const rlBosySymbolSeven = Number(receptiveLanguageSsFirst) === 7 ? "X" : "∙";
                        const rlBosySymbolEight = Number(receptiveLanguageSsFirst) === 8 ? "X" : "∙"; const rlBosySymbolNine = Number(receptiveLanguageSsFirst) === 9 ? "X" : "∙";  const rlBosySymbolTen = Number(receptiveLanguageSsFirst) === 10 ? "X" : "∙";
                        const rlBosySymbolEleven = Number(receptiveLanguageSsFirst) === 11 ? "X" : "∙"; const rlBosySymbolTwelve = Number(receptiveLanguageSsFirst) === 12 ? "X" : "∙"; const rlBosySymbolThirteen = Number(receptiveLanguageSsFirst) === 13 ? "X" : "∙";
                        const rlBosySymbolFourteen = Number(receptiveLanguageSsFirst) === 14 ? "X" : "∙"; const rlBosySymbolFifteen = Number(receptiveLanguageSsFirst) === 15 ? "X" : "∙"; const rlBosySymbolSixteen = Number(receptiveLanguageSsFirst) === 16 ? "X" : "∙";
                        const rlBosySymbolSeventeen = Number(receptiveLanguageSsFirst) === 17 ? "X" : "∙"; const rlBosySymbolEighteen = Number(receptiveLanguageSsFirst) === 18 ? "X" : "∙"; const rlBosySymbolNineteen = Number(receptiveLanguageSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on expressiveLanguageSsFirst
                        const elBosySymbolOne = Number(expressiveLanguageSsFirst) === 1 ? "X" : "∙"; const elBosySymbolTwo = Number(expressiveLanguageSsFirst) === 2 ? "X" : "∙"; const elBosySymbolThree = Number(expressiveLanguageSsFirst) === 3 ? "X" : "∙"; const elBosySymbolFour = Number(expressiveLanguageSsFirst) === 4 ? "X" : "∙";
                        const elBosySymbolFive = Number(expressiveLanguageSsFirst) === 5 ? "X" : "∙"; const elBosySymbolSix = Number(expressiveLanguageSsFirst) === 6 ? "X" : "∙"; const elBosySymbolSeven = Number(expressiveLanguageSsFirst) === 7 ? "X" : "∙";
                        const elBosySymbolEight = Number(expressiveLanguageSsFirst) === 8 ? "X" : "∙"; const elBosySymbolNine = Number(expressiveLanguageSsFirst) === 9 ? "X" : "∙"; const elBosySymbolTen = Number(expressiveLanguageSsFirst) === 10 ? "X" : "∙";
                        const elBosySymbolEleven = Number(expressiveLanguageSsFirst) === 11 ? "X" : "∙"; const elBosySymbolTwelve = Number(expressiveLanguageSsFirst) === 12 ? "X" : "∙"; const elBosySymbolThirteen = Number(expressiveLanguageSsFirst) === 13 ? "X" : "∙";
                        const elBosySymbolFourteen = Number(expressiveLanguageSsFirst) === 14 ? "X" : "∙"; const elBosySymbolFifteen = Number(expressiveLanguageSsFirst) === 15 ? "X" : "∙"; const elBosySymbolSixteen = Number(expressiveLanguageSsFirst) === 16 ? "X" : "∙";
                        const elBosySymbolSeventeen = Number(expressiveLanguageSsFirst) === 17 ? "X" : "∙"; const elBosySymbolEighteen = Number(expressiveLanguageSsFirst) === 18 ? "X" : "∙"; const elBosySymbolNineteen = Number(expressiveLanguageSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on cognitiveSsFirst
                        const cogBosySymbolOne = Number(cognitiveSsFirst) === 1 ? "X" : "∙"; const cogBosySymbolTwo = Number(cognitiveSsFirst) === 2 ? "X" : "∙"; const cogBosySymbolThree = Number(cognitiveSsFirst) === 3 ? "X" : "∙"; const cogBosySymbolFour = Number(cognitiveSsFirst) === 4 ? "X" : "∙";
                        const cogBosySymbolFive = Number(cognitiveSsFirst) === 5 ? "X" : "∙"; const cogBosySymbolSix = Number(cognitiveSsFirst) === 6 ? "X" : "∙"; const cogBosySymbolSeven = Number(cognitiveSsFirst) === 7 ? "X" : "∙";
                        const cogBosySymbolEight = Number(cognitiveSsFirst) === 8 ? "X" : "∙"; const cogBosySymbolNine = Number(cognitiveSsFirst) === 9 ? "X" : "∙"; const cogBosySymbolTen = Number(cognitiveSsFirst) === 10 ? "X" : "∙";
                        const cogBosySymbolEleven = Number(cognitiveSsFirst) === 11 ? "X" : "∙"; const cogBosySymbolTwelve = Number(cognitiveSsFirst) === 12 ? "X" : "∙"; const cogBosySymbolThirteen = Number(cognitiveSsFirst) === 13 ? "X" : "∙";
                        const cogBosySymbolFourteen = Number(cognitiveSsFirst) === 14 ? "X" : "∙"; const cogBosySymbolFifteen = Number(cognitiveSsFirst) === 15 ? "X" : "∙"; const cogBosySymbolSixteen = Number(cognitiveSsFirst) === 16 ? "X" : "∙";
                        const cogBosySymbolSeventeen = Number(cognitiveSsFirst) === 17 ? "X" : "∙"; const cogBosySymbolEighteen = Number(cognitiveSsFirst) === 18 ? "X" : "∙"; const cogBosySymbolNineteen = Number(cognitiveSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on socioEmotionalSsFirst
                        const seBosySymbolOne = Number(socioEmotionalSsFirst) === 1 ? "X" : "∙"; const seBosySymbolTwo = Number(socioEmotionalSsFirst) === 2 ? "X" : "∙"; const seBosySymbolThree = Number(socioEmotionalSsFirst) === 3 ? "X" : "∙"; const seBosySymbolFour = Number(socioEmotionalSsFirst) === 4 ? "X" : "∙";
                        const seBosySymbolFive = Number(socioEmotionalSsFirst) === 5 ? "X" : "∙"; const seBosySymbolSix = Number(socioEmotionalSsFirst) === 6 ? "X" : "∙"; const seBosySymbolSeven = Number(socioEmotionalSsFirst) === 7 ? "X" : "∙";
                        const seBosySymbolEight = Number(socioEmotionalSsFirst) === 8 ? "X" : "∙"; const seBosySymbolNine = Number(socioEmotionalSsFirst) === 9 ? "X" : "∙"; const seBosySymbolTen = Number(socioEmotionalSsFirst) === 10 ? "X" : "∙";
                        const seBosySymbolEleven = Number(socioEmotionalSsFirst) === 11 ? "X" : "∙"; const seBosySymbolTwelve = Number(socioEmotionalSsFirst) === 12 ? "X" : "∙"; const seBosySymbolThirteen = Number(socioEmotionalSsFirst) === 13 ? "X" : "∙";
                        const seBosySymbolFourteen = Number(socioEmotionalSsFirst) === 14 ? "X" : "∙"; const seBosySymbolFifteen = Number(socioEmotionalSsFirst) === 15 ? "X" : "∙"; const seBosySymbolSixteen = Number(socioEmotionalSsFirst) === 16 ? "X" : "∙";
                        const seBosySymbolSeventeen = Number(socioEmotionalSsFirst) === 17 ? "X" : "∙"; const seBosySymbolEighteen = Number(socioEmotionalSsFirst) === 18 ? "X" : "∙"; const seBosySymbolNineteen = Number(socioEmotionalSsFirst) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on grossMotorSsSecond
                        const gmEosySymbolOne = Number(grossMotorSsSecond) === 1 ? "X" : "∙"; const gmEosySymbolTwo = Number(grossMotorSsSecond) === 2 ? "X" : "∙"; const gmEosySymbolThree = Number(grossMotorSsSecond) === 3 ? "X" : "∙"; const gmEosySymbolFour = Number(grossMotorSsSecond) === 4 ? "X" : "∙";
                        const gmEosySymbolFive = Number(grossMotorSsSecond) === 5 ? "X" : "∙"; const gmEosySymbolSix = Number(grossMotorSsSecond) === 6 ? "X" : "∙"; const gmEosySymbolSeven = Number(grossMotorSsSecond) === 7 ? "X" : "∙";
                        const gmEosySymbolEight = Number(grossMotorSsSecond) === 8 ? "X" : "∙"; const gmEosySymbolNine = Number(grossMotorSsSecond) === 9 ? "X" : "∙"; const gmEosySymbolTen = Number(grossMotorSsSecond) === 10 ? "X" : "∙";
                        const gmEosySymbolEleven = Number(grossMotorSsSecond) === 11 ? "X" : "∙"; const gmEosySymbolTwelve = Number(grossMotorSsSecond) === 12 ? "X" : "∙"; const gmEosySymbolThirteen = Number(grossMotorSsSecond) === 13 ? "X" : "∙";
                        const gmEosySymbolFourteen = Number(grossMotorSsSecond) === 14 ? "X" : "∙"; const gmEosySymbolFifteen = Number(grossMotorSsSecond) === 15 ? "X" : "∙"; const gmEosySymbolSixteen = Number(grossMotorSsSecond) === 16 ? "X" : "∙";
                        const gmEosySymbolSeventeen = Number(grossMotorSsSecond) === 17 ? "X" : "∙"; const gmEosySymbolEighteen = Number(grossMotorSsSecond) === 18 ? "X" : "∙"; const gmEosySymbolNineteen = Number(grossMotorSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on fineMotorSsSecond
                        const fmEosySymbolOne = Number(fineMotorSsSecond) === 1 ? "X" : "∙"; const fmEosySymbolTwo = Number(fineMotorSsSecond) === 2 ? "X" : "∙"; const fmEosySymbolThree = Number(fineMotorSsSecond) === 3 ? "X" : "∙"; const fmEosySymbolFour = Number(fineMotorSsSecond) === 4 ? "X" : "∙";
                        const fmEosySymbolFive = Number(fineMotorSsSecond) === 5 ? "X" : "∙"; const fmEosySymbolSix = Number(fineMotorSsSecond) === 6 ? "X" : "∙"; const fmEosySymbolSeven = Number(fineMotorSsSecond) === 7 ? "X" : "∙";
                        const fmEosySymbolEight = Number(fineMotorSsSecond) === 8 ? "X" : "∙"; const fmEosySymbolNine = Number(fineMotorSsSecond) === 9 ? "X" : "∙"; const fmEosySymbolTen = Number(fineMotorSsSecond) === 10 ? "X" : "∙";
                        const fmEosySymbolEleven = Number(fineMotorSsSecond) === 11 ? "X" : "∙"; const fmEosySymbolTwelve = Number(fineMotorSsSecond) === 12 ? "X" : "∙"; const fmEosySymbolThirteen = Number(fineMotorSsSecond) === 13 ? "X" : "∙";
                        const fmEosySymbolFourteen = Number(fineMotorSsSecond) === 14 ? "X" : "∙"; const fmEosySymbolFifteen = Number(fineMotorSsSecond) === 15 ? "X" : "∙"; const fmEosySymbolSixteen = Number(fineMotorSsSecond) === 16 ? "X" : "∙"; 
                        const fmEosySymbolSeventeen = Number(fineMotorSsSecond) === 17 ? "X" : "∙"; const fmEosySymbolEighteen = Number(fineMotorSsSecond) === 18 ? "X" : "∙"; const fmEosySymbolNineteen = Number(fineMotorSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on selfhelpSsSecond
                        const shEosySymbolOne = Number(selfhelpSsSecond) === 1 ? "X" : "∙"; const shEosySymbolTwo = Number(selfhelpSsSecond) === 2 ? "X" : "∙"; const shEosySymbolThree = Number(selfhelpSsSecond) === 3 ? "X" : "∙"; const shEosySymbolFour = Number(selfhelpSsSecond) === 4 ? "X" : "∙";
                        const shEosySymbolFive = Number(selfhelpSsSecond) === 5 ? "X" : "∙"; const shEosySymbolSix = Number(selfhelpSsSecond) === 6 ? "X" : "∙"; const shEosySymbolSeven = Number(selfhelpSsSecond) === 7 ? "X" : "∙";
                        const shEosySymbolEight = Number(selfhelpSsSecond) === 8 ? "X" : "∙"; const shEosySymbolNine = Number(selfhelpSsSecond) === 9 ? "X" : "∙"; const shEosySymbolTen = Number(selfhelpSsSecond) === 10 ? "X" : "∙";
                        const shEosySymbolEleven = Number(selfhelpSsSecond) === 11 ? "X" : "∙"; const shEosySymbolTwelve = Number(selfhelpSsSecond) === 12 ? "X" : "∙"; const shEosySymbolThirteen = Number(selfhelpSsSecond) === 13 ? "X" : "∙";
                        const shEosySymbolFourteen = Number(selfhelpSsSecond) === 14 ? "X" : "∙"; const shEosySymbolFifteen = Number(selfhelpSsSecond) === 15 ? "X" : "∙"; const shEosySymbolSixteen = Number(selfhelpSsSecond) === 16 ? "X" : "∙";
                        const shEosySymbolSeventeen = Number(selfhelpSsSecond) === 17 ? "X" : "∙"; const shEosySymbolEighteen = Number(selfhelpSsSecond) === 18 ? "X" : "∙"; const shEosySymbolNineteen = Number(selfhelpSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on receptiveLanguageSsSecond
                        const rlEosySymbolOne = Number(receptiveLanguageSsSecond) === 1 ? "X" : "∙"; const rlEosySymbolTwo = Number(receptiveLanguageSsSecond) === 2 ? "X" : "∙"; const rlEosySymbolThree = Number(receptiveLanguageSsSecond) === 3 ? "X" : "∙"; const rlEosySymbolFour = Number(receptiveLanguageSsSecond) === 4 ? "X" : "∙";
                        const rlEosySymbolFive = Number(receptiveLanguageSsSecond) === 5 ? "X" : "∙"; const rlEosySymbolSix = Number(receptiveLanguageSsSecond) === 6 ? "X" : "∙"; const rlEosySymbolSeven = Number(receptiveLanguageSsSecond) === 7 ? "X" : "∙";
                        const rlEosySymbolEight = Number(receptiveLanguageSsSecond) === 8 ? "X" : "∙"; const rlEosySymbolNine = Number(receptiveLanguageSsSecond) === 9 ? "X" : "∙"; const rlEosySymbolTen = Number(receptiveLanguageSsSecond) === 10 ? "X" : "∙";
                        const rlEosySymbolEleven = Number(receptiveLanguageSsSecond) === 11 ? "X" : "∙"; const rlEosySymbolTwelve = Number(receptiveLanguageSsSecond) === 12 ? "X" : "∙"; const rlEosySymbolThirteen = Number(receptiveLanguageSsSecond) === 13 ? "X" : "∙";
                        const rlEosySymbolFourteen = Number(receptiveLanguageSsSecond) === 14 ? "X" : "∙"; const rlEosySymbolFifteen = Number(receptiveLanguageSsSecond) === 15 ? "X" : "∙"; const rlEosySymbolSixteen = Number(receptiveLanguageSsSecond) === 16 ? "X" : "∙";
                        const rlEosySymbolSeventeen = Number(receptiveLanguageSsSecond) === 17 ? "X" : "∙"; const rlEosySymbolEighteen = Number(receptiveLanguageSsSecond) === 18 ? "X" : "∙"; const rlEosySymbolNineteen = Number(receptiveLanguageSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on expressiveLanguageSsSecond
                        const elEosySymbolOne = Number(expressiveLanguageSsSecond) === 1 ? "X" : "∙"; const elEosySymbolTwo = Number(expressiveLanguageSsSecond) === 2 ? "X" : "∙"; const elEosySymbolThree = Number(expressiveLanguageSsSecond) === 3 ? "X" : "∙"; const elEosySymbolFour = Number(expressiveLanguageSsSecond) === 4 ? "X" : "∙";
                        const elEosySymbolFive = Number(expressiveLanguageSsSecond) === 5 ? "X" : "∙"; const elEosySymbolSix = Number(expressiveLanguageSsSecond) === 6 ? "X" : "∙"; const elEosySymbolSeven = Number(expressiveLanguageSsSecond) === 7 ? "X" : "∙";
                        const elEosySymbolEight = Number(expressiveLanguageSsSecond) === 8 ? "X" : "∙"; const elEosySymbolNine = Number(expressiveLanguageSsSecond) === 9 ? "X" : "∙"; const elEosySymbolTen = Number(expressiveLanguageSsSecond) === 10 ? "X" : "∙";
                        const elEosySymbolEleven = Number(expressiveLanguageSsSecond) === 11 ? "X" : "∙"; const elEosySymbolTwelve = Number(expressiveLanguageSsSecond) === 12 ? "X" : "∙"; const elEosySymbolThirteen = Number(expressiveLanguageSsSecond) === 13 ? "X" : "∙";
                        const elEosySymbolFourteen = Number(expressiveLanguageSsSecond) === 14 ? "X" : "∙"; const elEosySymbolFifteen = Number(expressiveLanguageSsSecond) === 15 ? "X" : "∙"; const elEosySymbolSixteen = Number(expressiveLanguageSsSecond) === 16 ? "X" : "∙";
                        const elEosySymbolSeventeen = Number(expressiveLanguageSsSecond) === 17 ? "X" : "∙"; const elEosySymbolEighteen = Number(expressiveLanguageSsSecond) === 18 ? "X" : "∙"; const elEosySymbolNineteen = Number(expressiveLanguageSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on cognitiveSsSecond
                        const cogEosySymbolOne = Number(cognitiveSsSecond) === 1 ? "X" : "∙"; const cogEosySymbolTwo = Number(cognitiveSsSecond) === 2 ? "X" : "∙"; const cogEosySymbolThree = Number(cognitiveSsSecond) === 3 ? "X" : "∙"; const cogEosySymbolFour = Number(cognitiveSsSecond) === 4 ? "X" : "∙";
                        const cogEosySymbolFive = Number(cognitiveSsSecond) === 5 ? "X" : "∙"; const cogEosySymbolSix = Number(cognitiveSsSecond) === 6 ? "X" : "∙"; const cogEosySymbolSeven = Number(cognitiveSsSecond) === 7 ? "X" : "∙";
                        const cogEosySymbolEight = Number(cognitiveSsSecond) === 8 ? "X" : "∙"; const cogEosySymbolNine = Number(cognitiveSsSecond) === 9 ? "X" : "∙"; const cogEosySymbolTen = Number(cognitiveSsSecond) === 10 ? "X" : "∙";
                        const cogEosySymbolEleven = Number(cognitiveSsSecond) === 11 ? "X" : "∙"; const cogEosySymbolTwelve = Number(cognitiveSsSecond) === 12 ? "X" : "∙"; const cogEosySymbolThirteen = Number(cognitiveSsSecond) === 13 ? "X" : "∙";
                        const cogEosySymbolFourteen = Number(cognitiveSsSecond) === 14 ? "X" : "∙"; const cogEosySymbolFifteen = Number(cognitiveSsSecond) === 15 ? "X" : "∙"; const cogEosySymbolSixteen = Number(cognitiveSsSecond) === 16 ? "X" : "∙";
                        const cogEosySymbolSeventeen = Number(cognitiveSsSecond) === 17 ? "X" : "∙"; const cogEosySymbolEighteen = Number(cognitiveSsSecond) === 18 ? "X" : "∙"; const cogEosySymbolNineteen = Number(cognitiveSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine "X" or "∙" based on socioEmotionalSsSecond
                        const seEosySymbolOne = Number(socioEmotionalSsSecond) === 1 ? "X" : "∙"; const seEosySymbolTwo = Number(socioEmotionalSsSecond) === 2 ? "X" : "∙"; const seEosySymbolThree = Number(socioEmotionalSsSecond) === 3 ? "X" : "∙"; const seEosySymbolFour = Number(socioEmotionalSsSecond) === 4 ? "X" : "∙";
                        const seEosySymbolFive = Number(socioEmotionalSsSecond) === 5 ? "X" : "∙"; const seEosySymbolSix = Number(socioEmotionalSsSecond) === 6 ? "X" : "∙"; const seEosySymbolSeven = Number(socioEmotionalSsSecond) === 7 ? "X" : "∙";
                        const seEosySymbolEight = Number(socioEmotionalSsSecond) === 8 ? "X" : "∙"; const seEosySymbolNine = Number(socioEmotionalSsSecond) === 9 ? "X" : "∙"; const seEosySymbolTen = Number(socioEmotionalSsSecond) === 10 ? "X" : "∙";
                        const seEosySymbolEleven = Number(socioEmotionalSsSecond) === 11 ? "X" : "∙"; const seEosySymbolTwelve = Number(socioEmotionalSsSecond) === 12 ? "X" : "∙"; const seEosySymbolThirteen = Number(socioEmotionalSsSecond) === 13 ? "X" : "∙";
                        const seEosySymbolFourteen = Number(socioEmotionalSsSecond) === 14 ? "X" : "∙"; const seEosySymbolFifteen = Number(socioEmotionalSsSecond) === 15 ? "X" : "∙"; const seEosySymbolSixteen = Number(socioEmotionalSsSecond) === 16 ? "X" : "∙";
                        const seEosySymbolSeventeen = Number(socioEmotionalSsSecond) === 17 ? "X" : "∙"; const seEosySymbolEighteen = Number(socioEmotionalSsSecond) === 18 ? "X" : "∙"; const seEosySymbolNineteen = Number(socioEmotionalSsSecond) === 19 ? "X" : "∙";
            
                        // Simple conditional to determine for StandardScores BoSY Assessment
                        const bosyStandardScoreOne = Number(firstStandardScoreValue) <= 30 ? "X" : "∙";
                        const bosyStandardScoreTwo = bosyStandardScoreOne === "X" ? "∙" : (Number(firstStandardScoreValue) <= 40 ? "X" : "∙");
                        const bosyStandardScoreThree = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X") ? "∙" : (Number(firstStandardScoreValue) <= 47 ? "X" : "∙");
                        const bosyStandardScoreFour = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X") ? "∙" : (Number(firstStandardScoreValue) <= 57 ? "X" : "∙");
                        const bosyStandardScoreFive = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X") ? "∙" : (Number(firstStandardScoreValue) <= 65 ? "X" : "∙");
                        const bosyStandardScoreSix = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X") ? "∙" : (Number(firstStandardScoreValue) <= 69 ? "X" : "∙");
                        const bosyStandardScoreSeven = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X") ? "∙" : (Number(firstStandardScoreValue) <= 70 ? "X" : "∙");
                        const bosyStandardScoreEight = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X") ? "∙" : (Number(firstStandardScoreValue) <= 78 ? "X" : "∙");
                        const bosyStandardScoreNine = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X") ? "∙" : (Number(firstStandardScoreValue) <= 88 ? "X" : "∙");
                        const bosyStandardScoreTen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X") ? "∙" : (Number(firstStandardScoreValue) <= 98 ? "X" : "∙");
                        const bosyStandardScoreEleven = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 108 ? "X" : "∙");
                        const bosyStandardScoreTwelve = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X") ? "∙" : (Number(firstStandardScoreValue) <= 115 ? "X" : "∙");
                        const bosyStandardScoreThirteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X") ? "∙" : (Number(firstStandardScoreValue) <= 119 ? "X" : "∙");
                        const bosyStandardScoreFourteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 120 ? "X" : "∙");
                        const bosyStandardScoreFifteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X" || bosyStandardScoreFourteen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 129 ? "X" : "∙");
                        const bosyStandardScoreSixteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X" || bosyStandardScoreFourteen === "X" || bosyStandardScoreFifteen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 139 ? "X" : "∙");
                        const bosyStandardScoreSeventeen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X" || bosyStandardScoreFourteen === "X" || bosyStandardScoreFifteen === "X" || bosyStandardScoreSixteen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 149 ? "X" : "∙");
                        const bosyStandardScoreEighteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X" || bosyStandardScoreFourteen === "X" || bosyStandardScoreFifteen === "X" || bosyStandardScoreSixteen === "X" || bosyStandardScoreSeventeen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 155 ? "X" : "∙");
                        const bosyStandardScoreNineteen = (bosyStandardScoreOne === "X" || bosyStandardScoreTwo === "X" || bosyStandardScoreThree === "X" || bosyStandardScoreFour === "X" || bosyStandardScoreFive === "X" || bosyStandardScoreSix === "X" || bosyStandardScoreSeven === "X" || bosyStandardScoreEight === "X" || bosyStandardScoreNine === "X" || bosyStandardScoreTen === "X" || bosyStandardScoreEleven === "X" || bosyStandardScoreTwelve === "X" || bosyStandardScoreThirteen === "X" || bosyStandardScoreFourteen === "X" || bosyStandardScoreFifteen === "X" || bosyStandardScoreSixteen === "X" || bosyStandardScoreSeventeen === "X" || bosyStandardScoreEighteen === "X") ? "∙" : (Number(firstStandardScoreValue) <= 160 ? "X" : "∙");
            
                        // Date Generator based on Conditional Result of StandaredScores BoSY Assessment
                        const bosyStandardScoreDateOne = bosyStandardScoreOne === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateTwo = bosyStandardScoreTwo === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateThree = bosyStandardScoreThree === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateFour = bosyStandardScoreFour === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateFive = bosyStandardScoreFive === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateSix = bosyStandardScoreSix === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateSeven = bosyStandardScoreSeven === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateEight = bosyStandardScoreEight === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateNine = bosyStandardScoreNine === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateTen = bosyStandardScoreTen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateEleven = bosyStandardScoreEleven === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateTwelve = bosyStandardScoreTwelve === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateThirteen = bosyStandardScoreThirteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateFourteen = bosyStandardScoreFourteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateFifteen = bosyStandardScoreFifteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateSixteen = bosyStandardScoreSixteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateSeventeen = bosyStandardScoreSeventeen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateEighteen = bosyStandardScoreEighteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
                        const bosyStandardScoreDateNineteen = bosyStandardScoreNineteen === "X" ? `${syStartMonth}/${systartDay}/${syStart}` : "";
            
                        // Simple conditional to determine for StandardScores EoSY Assessment
                        const eosyStandardScoreOne = Number(secondStandardScoreValue) <= 30 ? "X" : "∙";
                        const eosyStandardScoreTwo = eosyStandardScoreOne === "X" ? "∙" : (Number(secondStandardScoreValue) <= 40 ? "X" : "∙");
                        const eosyStandardScoreThree = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X") ? "∙" : (Number(secondStandardScoreValue) <= 47 ? "X" : "∙");
                        const eosyStandardScoreFour = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X") ? "∙" : (Number(secondStandardScoreValue) <= 57 ? "X" : "∙");
                        const eosyStandardScoreFive = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X") ? "∙" : (Number(secondStandardScoreValue) <= 65 ? "X" : "∙");
                        const eosyStandardScoreSix = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X") ? "∙" : (Number(secondStandardScoreValue) <= 69 ? "X" : "∙");
                        const eosyStandardScoreSeven = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X") ? "∙" : (Number(secondStandardScoreValue) <= 70 ? "X" : "∙");
                        const eosyStandardScoreEight = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X") ? "∙" : (Number(secondStandardScoreValue) <= 78 ? "X" : "∙");
                        const eosyStandardScoreNine = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X") ? "∙" : (Number(secondStandardScoreValue) <= 88 ? "X" : "∙");
                        const eosyStandardScoreTen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X") ? "∙" : (Number(secondStandardScoreValue) <= 98 ? "X" : "∙");
                        const eosyStandardScoreEleven = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 108 ? "X" : "∙");
                        const eosyStandardScoreTwelve = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X") ? "∙" : (Number(secondStandardScoreValue) <= 115 ? "X" : "∙");
                        const eosyStandardScoreThirteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X") ? "∙" : (Number(secondStandardScoreValue) <= 119 ? "X" : "∙");
                        const eosyStandardScoreFourteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 120 ? "X" : "∙");
                        const eosyStandardScoreFifteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X" || eosyStandardScoreFourteen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 129 ? "X" : "∙");
                        const eosyStandardScoreSixteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X" || eosyStandardScoreFourteen === "X" || eosyStandardScoreFifteen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 139 ? "X" : "∙");
                        const eosyStandardScoreSeventeen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X" || eosyStandardScoreFourteen === "X" || eosyStandardScoreFifteen === "X" || eosyStandardScoreSixteen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 149 ? "X" : "∙");
                        const eosyStandardScoreEighteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X" || eosyStandardScoreFourteen === "X" || eosyStandardScoreFifteen === "X" || eosyStandardScoreSixteen === "X" || eosyStandardScoreSeventeen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 155 ? "X" : "∙");
                        const eosyStandardScoreNineteen = (eosyStandardScoreOne === "X" || eosyStandardScoreTwo === "X" || eosyStandardScoreThree === "X" || eosyStandardScoreFour === "X" || eosyStandardScoreFive === "X" || eosyStandardScoreSix === "X" || eosyStandardScoreSeven === "X" || eosyStandardScoreEight === "X" || eosyStandardScoreNine === "X" || eosyStandardScoreTen === "X" || eosyStandardScoreEleven === "X" || eosyStandardScoreTwelve === "X" || eosyStandardScoreThirteen === "X" || eosyStandardScoreFourteen === "X" || eosyStandardScoreFifteen === "X" || eosyStandardScoreSixteen === "X" || eosyStandardScoreSeventeen === "X" || eosyStandardScoreEighteen === "X") ? "∙" : (Number(secondStandardScoreValue) <= 160 ? "X" : "∙");
            
                        // Date Generator based on Conditional Result of StandaredScores EoSY Assessment
                        const eosyStandardScoreDateOne = eosyStandardScoreOne === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateTwo = eosyStandardScoreTwo === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateThree = eosyStandardScoreThree === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateFour = eosyStandardScoreFour === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateFive = eosyStandardScoreFive === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateSix = eosyStandardScoreSix === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateSeven = eosyStandardScoreSeven === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateEight = eosyStandardScoreEight === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateNine = eosyStandardScoreNine === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateTen = eosyStandardScoreTen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateEleven = eosyStandardScoreEleven === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateTwelve = eosyStandardScoreTwelve === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateThirteen = eosyStandardScoreThirteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateFourteen = eosyStandardScoreFourteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateFifteen = eosyStandardScoreFifteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateSixteen = eosyStandardScoreSixteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateSeventeen = eosyStandardScoreSeventeen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateEighteen = eosyStandardScoreEighteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
                        const eosyStandardScoreDateNineteen = eosyStandardScoreNineteen === "X" ? `${syEndtMonth}/${syEndDay}/${syEnd}` : "";
            
                        const table1Content = generateTableContent(filteredScholasticData, filteredHelperData);
                        const table9Content = generateTable9Content(filteredScholasticData, filteredHelperData);
                        const table10Content = generateTable10Content(filteredScholasticData, filteredHelperData);
            
                        // Update Table 11-1 to capture both content and checkmarks
                        const table11_1Result = generateTable11_1Content(filteredScholasticData, filteredHelperData);
                        const table11_1Content = table11_1Result.html;
                        const table11_1Checkmarks = table11_1Result.checkmarks;
            
                        // Pass Table 11-1 checkmarks to Table 11-2
                        const table11_2Content = generateTable11_2Content(filteredScholasticData, filteredHelperData, table11_1Checkmarks);
            
                        const table12Content = generateTable12Content(filteredScholasticData, filteredHelperData);
                        const table13Content = generateTable13Content(filteredScholasticData, filteredHelperData);
                        const table14Content = generateTable14Content(filteredScholasticData, filteredHelperData);

// katan variables dayn ha taas
openResultsWindow(
        fullName, 
        yrsOld, 
        lrnNumber, 
        birthday, 
        gender, 
        syYear, 
        adviserName, 
        principalName, 
        syStart, 
        syEnd, 
        syStartMonth, 
        syEndtMonth, 
        systartDay, 
        syEndDay, 
        birthYear, 
        birthMonth, 
        birthDay, 
        ChildAgeInYears, 
        ChildAgeRemainMonths, 
        ChildAgeRemainDays, 
        ChildAgeInYearsEnd, 
        ChildAgeRemainMonthsEnd, 
        ChildAgeRemainDaysEnd,
        grossMotorRsFirst, grossMotorSsFirst, grossMotorRsSecond, grossMotorSsSecond,
        fineMotorRsFirst, fineMotorSsFirst, fineMotorRsSecond, fineMotorSsSecond,
        selfHelpRsFirst, selfhelpSsFirst, selfhelpRsSecond, selfhelpSsSecond,
        receptiveLanguageRsFirst, receptiveLanguageSsFirst, receptiveLanguageRsSecond, receptiveLanguageSsSecond,
        expressiveLanguageRsFirst, expressiveLanguageSsFirst, expressiveLanguageRsSecond, expressiveLanguageSsSecond,
        cognitiveRsFirst, cognitiveRsSecond, cognitiveSsFirst, cognitiveSsSecond,
        socioEmotionalRsFirst, socioEmotionalSsFirst, socioEmotionalRsSecond, socioEmotionalSsSecond,
        firstScaledScoreTotalSum, secondScaledScoreTotalSum,
        firstStandardScoreValue, secondStandardScoreValue,
        interpretationFirstStandardScoreValue, interpretationSecondStandardScoreValue,
        gmBosySymbolOne, gmBosySymbolTwo, gmBosySymbolThree, gmBosySymbolFour, gmBosySymbolFive, gmBosySymbolSix, gmBosySymbolSeven, gmBosySymbolEight, gmBosySymbolNine, gmBosySymbolTen, gmBosySymbolEleven, gmBosySymbolTwelve, gmBosySymbolThirteen, gmBosySymbolFourteen, gmBosySymbolFifteen, gmBosySymbolSixteen, gmBosySymbolSeventeen, gmBosySymbolEighteen, gmBosySymbolNineteen,
        fmBosySymbolOne, fmBosySymbolTwo, fmBosySymbolThree, fmBosySymbolFour, fmBosySymbolFive, fmBosySymbolSix, fmBosySymbolSeven, fmBosySymbolEight, fmBosySymbolNine, fmBosySymbolTen, fmBosySymbolEleven, fmBosySymbolTwelve, fmBosySymbolThirteen, fmBosySymbolFourteen, fmBosySymbolFifteen, fmBosySymbolSixteen, fmBosySymbolSeventeen, fmBosySymbolEighteen, fmBosySymbolNineteen,
        shBosySymbolOne, shBosySymbolTwo, shBosySymbolThree, shBosySymbolFour, shBosySymbolFive, shBosySymbolSix, shBosySymbolSeven, shBosySymbolEight, shBosySymbolNine, shBosySymbolTen, shBosySymbolEleven, shBosySymbolTwelve, shBosySymbolThirteen, shBosySymbolFourteen, shBosySymbolFifteen, shBosySymbolSixteen, shBosySymbolSeventeen, shBosySymbolEighteen, shBosySymbolNineteen,
        rlBosySymbolOne, rlBosySymbolTwo, rlBosySymbolThree, rlBosySymbolFour, rlBosySymbolFive, rlBosySymbolSix, rlBosySymbolSeven, rlBosySymbolEight, rlBosySymbolNine, rlBosySymbolTen, rlBosySymbolEleven, rlBosySymbolTwelve, rlBosySymbolThirteen, rlBosySymbolFourteen, rlBosySymbolFifteen, rlBosySymbolSixteen, rlBosySymbolSeventeen, rlBosySymbolEighteen, rlBosySymbolNineteen,
        elBosySymbolOne, elBosySymbolTwo, elBosySymbolThree, elBosySymbolFour, elBosySymbolFive, elBosySymbolSix, elBosySymbolSeven, elBosySymbolEight, elBosySymbolNine, elBosySymbolTen, elBosySymbolEleven, elBosySymbolTwelve, elBosySymbolThirteen, elBosySymbolFourteen, elBosySymbolFifteen, elBosySymbolSixteen, elBosySymbolSeventeen, elBosySymbolEighteen, elBosySymbolNineteen,
        cogBosySymbolOne, cogBosySymbolTwo, cogBosySymbolThree, cogBosySymbolFour, cogBosySymbolFive, cogBosySymbolSix, cogBosySymbolSeven, cogBosySymbolEight, cogBosySymbolNine, cogBosySymbolTen, cogBosySymbolEleven, cogBosySymbolTwelve, cogBosySymbolThirteen, cogBosySymbolFourteen, cogBosySymbolFifteen, cogBosySymbolSixteen, cogBosySymbolSeventeen, cogBosySymbolEighteen, cogBosySymbolNineteen,
        seBosySymbolOne, seBosySymbolTwo, seBosySymbolThree, seBosySymbolFour, seBosySymbolFive, seBosySymbolSix, seBosySymbolSeven, seBosySymbolEight, seBosySymbolNine, seBosySymbolTen, seBosySymbolEleven, seBosySymbolTwelve, seBosySymbolThirteen, seBosySymbolFourteen, seBosySymbolFifteen, seBosySymbolSixteen, seBosySymbolSeventeen, seBosySymbolEighteen, seBosySymbolNineteen,
        gmEosySymbolOne, gmEosySymbolTwo, gmEosySymbolThree, gmEosySymbolFour, gmEosySymbolFive, gmEosySymbolSix, gmEosySymbolSeven, gmEosySymbolEight, gmEosySymbolNine, gmEosySymbolTen, gmEosySymbolEleven, gmEosySymbolTwelve, gmEosySymbolThirteen, gmEosySymbolFourteen, gmEosySymbolFifteen, gmEosySymbolSixteen, gmEosySymbolSeventeen, gmEosySymbolEighteen, gmEosySymbolNineteen,
        fmEosySymbolOne, fmEosySymbolTwo, fmEosySymbolThree, fmEosySymbolFour, fmEosySymbolFive, fmEosySymbolSix, fmEosySymbolSeven, fmEosySymbolEight, fmEosySymbolNine, fmEosySymbolTen, fmEosySymbolEleven, fmEosySymbolTwelve, fmEosySymbolThirteen, fmEosySymbolFourteen, fmEosySymbolFifteen, fmEosySymbolSixteen, fmEosySymbolSeventeen, fmEosySymbolEighteen, fmEosySymbolNineteen,
        shEosySymbolOne, shEosySymbolTwo, shEosySymbolThree, shEosySymbolFour, shEosySymbolFive, shEosySymbolSix, shEosySymbolSeven, shEosySymbolEight, shEosySymbolNine, shEosySymbolTen, shEosySymbolEleven, shEosySymbolTwelve, shEosySymbolThirteen, shEosySymbolFourteen, shEosySymbolFifteen, shEosySymbolSixteen, shEosySymbolSeventeen, shEosySymbolEighteen, shEosySymbolNineteen,
        rlEosySymbolOne, rlEosySymbolTwo, rlEosySymbolThree, rlEosySymbolFour, rlEosySymbolFive, rlEosySymbolSix, rlEosySymbolSeven, rlEosySymbolEight, rlEosySymbolNine, rlEosySymbolTen, rlEosySymbolEleven, rlEosySymbolTwelve, rlEosySymbolThirteen, rlEosySymbolFourteen, rlEosySymbolFifteen, rlEosySymbolSixteen, rlEosySymbolSeventeen, rlEosySymbolEighteen, rlEosySymbolNineteen,
        elEosySymbolOne, elEosySymbolTwo, elEosySymbolThree, elEosySymbolFour, elEosySymbolFive, elEosySymbolSix, elEosySymbolSeven, elEosySymbolEight, elEosySymbolNine, elEosySymbolTen, elEosySymbolEleven, elEosySymbolTwelve, elEosySymbolThirteen, elEosySymbolFourteen, elEosySymbolFifteen, elEosySymbolSixteen, elEosySymbolSeventeen, elEosySymbolEighteen, elEosySymbolNineteen,
        cogEosySymbolOne, cogEosySymbolTwo, cogEosySymbolThree, cogEosySymbolFour, cogEosySymbolFive, cogEosySymbolSix, cogEosySymbolSeven, cogEosySymbolEight, cogEosySymbolNine, cogEosySymbolTen, cogEosySymbolEleven, cogEosySymbolTwelve, cogEosySymbolThirteen, cogEosySymbolFourteen, cogEosySymbolFifteen, cogEosySymbolSixteen, cogEosySymbolSeventeen, cogEosySymbolEighteen, cogEosySymbolNineteen,
        seEosySymbolOne, seEosySymbolTwo, seEosySymbolThree, seEosySymbolFour, seEosySymbolFive, seEosySymbolSix, seEosySymbolSeven, seEosySymbolEight, seEosySymbolNine, seEosySymbolTen, seEosySymbolEleven, seEosySymbolTwelve, seEosySymbolThirteen, seEosySymbolFourteen, seEosySymbolFifteen, seEosySymbolSixteen, seEosySymbolSeventeen, seEosySymbolEighteen, seEosySymbolNineteen,
        bosyStandardScoreOne, bosyStandardScoreTwo, bosyStandardScoreThree, bosyStandardScoreFour, bosyStandardScoreFive, bosyStandardScoreSix, bosyStandardScoreSeven, bosyStandardScoreEight, bosyStandardScoreNine, bosyStandardScoreTen, bosyStandardScoreEleven, bosyStandardScoreTwelve, bosyStandardScoreThirteen, bosyStandardScoreFourteen, bosyStandardScoreFifteen, bosyStandardScoreSixteen, bosyStandardScoreSeventeen, bosyStandardScoreEighteen, bosyStandardScoreNineteen,
        eosyStandardScoreOne, eosyStandardScoreTwo, eosyStandardScoreThree, eosyStandardScoreFour, eosyStandardScoreFive, eosyStandardScoreSix, eosyStandardScoreSeven, eosyStandardScoreEight, eosyStandardScoreNine, eosyStandardScoreTen, eosyStandardScoreEleven, eosyStandardScoreTwelve, eosyStandardScoreThirteen, eosyStandardScoreFourteen, eosyStandardScoreFifteen, eosyStandardScoreSixteen, eosyStandardScoreSeventeen, eosyStandardScoreEighteen, eosyStandardScoreNineteen,
        bosyStandardScoreDateOne, bosyStandardScoreDateTwo, bosyStandardScoreDateThree, bosyStandardScoreDateFour, bosyStandardScoreDateFive, bosyStandardScoreDateSix, bosyStandardScoreDateSeven, bosyStandardScoreDateEight, bosyStandardScoreDateNine, bosyStandardScoreDateTen, bosyStandardScoreDateEleven, bosyStandardScoreDateTwelve, bosyStandardScoreDateThirteen, bosyStandardScoreDateFourteen, bosyStandardScoreDateFifteen, bosyStandardScoreDateSixteen, bosyStandardScoreDateSeventeen, bosyStandardScoreDateEighteen, bosyStandardScoreDateNineteen,
        eosyStandardScoreDateOne, eosyStandardScoreDateTwo, eosyStandardScoreDateThree, eosyStandardScoreDateFour, eosyStandardScoreDateFive, eosyStandardScoreDateSix, eosyStandardScoreDateSeven, eosyStandardScoreDateEight, eosyStandardScoreDateNine, eosyStandardScoreDateTen, eosyStandardScoreDateEleven, eosyStandardScoreDateTwelve, eosyStandardScoreDateThirteen, eosyStandardScoreDateFourteen, eosyStandardScoreDateFifteen, eosyStandardScoreDateSixteen, eosyStandardScoreDateSeventeen, eosyStandardScoreDateEighteen, eosyStandardScoreDateNineteen,
        table1Content, table9Content, table10Content, table11_1Content, table11_2Content,table12Content, table13Content, table14Content

    );

    resultsDiv.innerHTML = 'Data fetched successfully. Check the new window for results.';
} else {
    resultsDiv.innerHTML = 'No matching records found. Please try again.';
}
} catch (error) {
console.error("Error fetching or processing data:", error);
resultsDiv.innerHTML = 'An error occurred while fetching data. Please try again later.';
}
}

// mga luun sin mga table iban bang hawnu kyawa in tanda
function generateTableContent(scholasticData, helperData) {
    const table1Config = [
        { description: "Enjoys watching activities of nearby people or animals.", column3: 87, column5: 196 },
        { description: "Friendly with strangers but initially may show slight anxiety or shyness.", column3: 88, column5: 197 },
        { description: "Plays alone but likes to be near familiar adults or brothers and sisters.", column3: 89, column5: 198 },
        { description: "Laughs or squeals aloud in play.", column3: 90, column5: 199 },
        { description: "Plays peek-a-boo (bulaga).", column3: 91, column5: 200 },
        { description: "Rolls ball interactively with caregiver/examiner.", column3: 92, column5: 201 },
        { description: "Hugs or cuddles toys.", column3: 93, column5: 202 },
        { description: "Demonstrates respect for elders using terms like “po” and “opo”.", column3: 94, column5: 203 },
        { description: "Shares toys with others.", column3: 95, column5: 204 },
        { description: "Imitates adult activities (e.g. cooking, washing).", column3: 96, column5: 205 },
        { description: "Identifies feelings in others.", column3: 97, column5: 206 },
        { description: "Appropriately uses cultural gestures of greeting without much prompting (e.g. mano, bless, kiss, etc.).", column3: 98, column5: 207 },
        { description: "Comforts playmates/siblings in distress.", column3: 99, column5: 208 },
        { description: "Persists when faced with problem or obstacle to his wants.", column3: 100, column5: 209 },
        { description: "Helps with family chores (e.g. wiping tables, watering plants, etc.).", column3: 101, column5: 210 },
        { description: "Curious about the environment but knows when to stop asking questions of adults.", column3: 102, column5: 211 },
        { description: "Waits for turn.", column3: 103, column5: 212 },
        { description: "Asks permission to play with toy being used by another.", column3: 104, column5: 213 },
        { description: "Defends possessions with determination.", column3: 105, column5: 214 },
        { description: "Plays organized group games fairly (e.g. does not cheat in order to win).", column3: 106, column5: 215 },
        { description: "Can talk about difficult feelings (e.g. anger, sadness, worry) he experiences.", column3: 107, column5: 216 },
        { description: "Honors a simple bargain with caregiver (e.g. can play outside only after cleaning/fixing his room).", column3: 108, column5: 217 },
        { description: "Watches responsibly over younger siblings/family members.", column3: 109, column5: 218 },
        { description: "Cooperates with adults and peers in group situations to minimize quarrels and conflicts.", column3: 110, column5: 219 }
    ];

    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

// pag paawn sin mga tanda iban in itung niya
        const rowsHtml = table1Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;  // Mirrors Column 3
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;  // Mirrors Column 5

// in mga gumuwa ha tanda sin kahaba colum
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;
        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;
        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;
        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

// pagsangun sin mga tanda dayn ha surut
        return `
            <tr>
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

// in pag-itung ha duhul sin table
    const totalsRow = `
        <tr>
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;
    return rowsHtml + totalsRow;
}

function generateTable9Content(scholasticData, helperData) {
    const table9Config = [
        { description: "Climbs on a chair or other elevated piece of furniture like a bed without help.", column3: 2, column5: 111, height: "40px" },
        { description: "Walks backward.", column3: 3, column5: 112, height: "30px" },
        { description: "Runs without tripping or falling.", column3: 4, column5: 113, height: "30px" },
        { description: "Walks downstairs, 2 feet on each step, with one held.", column3: 5, column5: 114, height: "30px" },
        { description: "Walks upstairs holding handrail, 2 feet on each step.", column3: 6, column5: 115, height: "30px" },
        { description: "Walks upstairs with alternate feet without holding the handrail.", column3: 7, column5: 116, height: "40px" },
        { description: "Walks downstairs with alternate feet without holding the handrail.", column3: 8, column5: 117, height: "40px" },
        { description: "Moves body parts as directed.", column3: 9, column5: 118, height: "30px" },
        { description: "Jumps up.", column3: 10, column5: 119, height: "30px" },
        { description: "Throws ball overhead with direction.", column3: 11, column5: 120, height: "30px" },
        { description: "Hops 1-3 steps on preferred foot.", column3: 12, column5: 121, height: "30px" },
        { description: "Jump and turn.", column3: 13, column5: 122, height: "30px" },
        { description: "Dances patterns/join group movement activities.", column3: 14, column5: 123, height: "30px" },
    ];

    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

    const rowsHtml = table9Config.map((rowConfig, index) => {
        const resultColumn3 = (scholasticData[rowConfig.column3] || helperData[rowConfig.column3]) || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = (scholasticData[rowConfig.column5] || helperData[rowConfig.column5]) || "";
        const resultColumn6 = resultColumn5;

        // Column 3: Checkmark if TRUE, otherwise blank
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;

        // Column 4: Opposite of Column 3
        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;

        // Column 5: Checkmark if TRUE, otherwise blank
        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;

        // Column 6: Opposite of Column 5
        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add final row with checkmark totals for each column
    const totalsRow = `
        <tr style="height: 40px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}

// Function to generate Table 10 content
function generateTable10Content(scholasticData, helperData) {
    const table10Config = [
        { description: "Uses 5 fingers to get food/toys placed on a flat surface.", column3: 15, column5: 124, height: "30px" },
        { description: "Picks up objects with thumb and index finger.", column3: 16, column5: 125, height: "30px" },
        { description: "Displays a definite hand preference.", column3: 17, column5: 126, height: "30px" },
        { description: "Puts small objects in/out of containers.", column3: 18, column5: 127, height: "30px" },
        { description: "Holds a crayon with all the fingers of his hand, making a fist (i.e., palmar grasp).", column3: 19, column5: 128, height: "50px" },
        { description: "Unscrews lid of container or unwraps food.", column3: 20, column5: 129, height: "30px" },
        { description: "Scribbles spontaneously.", column3: 21, column5: 130, height: "30px" },
        { description: "Scribbles vertical and horizontal.", column3: 22, column5: 131, height: "30px" },
        { description: "Draws circle purposely.", column3: 23, column5: 132, height: "30px" },
        { description: "Draws a human figure (head, eyes, trunk, arms, hand/fingers).", column3: 24, column5: 133, height: "50px" },
        { description: "Draws a house using geometric forms.", column3: 25, column5: 134, height: "30px" }
    ];

    // Initialize counters for checkmarks
    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

    // Generate rows with checkmark logic
    const rowsHtml = table10Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        // Apply checkmark logic for each column
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;

        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;

        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;

        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

        // Generate the row HTML
        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add totals row at the end
    const totalsRow = `
        <tr style="height: 40px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}
// Function to generate content for Table 11-1
function generateTable11_1Content(scholasticData, helperData) {
    const table11_1Config = [
        { description: "Feeds self with finger food(e.g., biscuits, bread) using fingers.", column3: 26, column5: 135, height: "60px" },
        { description: "Feeds self using spoon with spillage.", column3: 27, column5: 136, height: "60px" },
        // Add more rows here if needed
    ];

    let totalColumn3Checkmarks = 0;
    let totalColumn4Checkmarks = 0;
    let totalColumn5Checkmarks = 0;
    let totalColumn6Checkmarks = 0;

    // Generate rows with checkmarks for Table 11-1
    const rowsHtml = table11_1Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") totalColumn3Checkmarks++;

        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") totalColumn4Checkmarks++;

        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") totalColumn5Checkmarks++;

        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") totalColumn6Checkmarks++;

        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    return {
        html: rowsHtml,
        checkmarks: {
            column3: totalColumn3Checkmarks,
            column4: totalColumn4Checkmarks,
            column5: totalColumn5Checkmarks,
            column6: totalColumn6Checkmarks
        }
    };
}

// Function to generate content for Table 11-2
function generateTable11_2Content(scholasticData, helperData, table11_1Checkmarks) {
    const table11_2Config = [
        { description: "Feeds self using spoon without spillage.", column3: 28, column5: 137, height: "30px" },
        { description: "Feeds self using fingers with spillage.", column3: 29, column5: 138, height: "30px" },
        { description: "Feeds self using fingers without spillage.", column3: 30, column5: 139, height: "30px" },
        { description: "Eats without need for spoonfeeding during any meal.", column3: 31, column5: 140, height: "30px" },
        { description: "Helps hold cup for drinking.", column3: 32, column5: 141, height: "30px" },
        { description: "Drinks from cup with spillage.", column3: 33, column5: 142, height: "30px" },
        { description: "Drinks from cup unassisted.", column3: 34, column5: 143, height: "30px" },
        { description: "Gets drink for self unassisted.", column3: 35, column5: 144, height: "30px" },
        { description: "Pours from pitcher without spillage.", column3: 36, column5: 145, height: "30px" },
        { description: "Prepares own food/snack.", column3: 37, column5: 146, height: "30px" },
        { description: "Prepares meals for younger siblings/family members when no adults is around.", column3: 38, column5: 147, height: "49px" },
        { description: "Participates when being dressed(e.g., raises arms or lifts leg).", column3: 39, column5: 148, height: "30px" },
        { description: "Pulls down gartered short pants.", column3: 40, column5: 149, height: "30px" },
        { description: "Removes sando.", column3: 41, column5: 150, height: "30px" },
        { description: "Dresses without assistance including buttons and tying.", column3: 42, column5: 151, height: "30px" },
        { description: "Dresses without assistance except for buttons and tying.", column3: 43, column5: 152, height: "30px" },
        { description: "Informs the adult only after he has already urinated (peed) or moved his bowels (poohed) in his underpants.", column3: 44, column5: 153, height: "49px" },
        { description: "Informs adult of need to urinate (pee) or move bowels (pooh-pooh) so he can be brought to designated place (e.g., comfort room).", column3: 45, column5: 154, height: "49px" },
        { description: "Goes to the designated place to urinate (pee) or move bowels (pooh) and still does this in his underpants/wear anymore.", column3: 46, column5: 155, height: "49px" },
        { description: "Goes to the designated place to urinate (pee) or move bowels (pooh) and never does this in his underpants/wear anymore.", column3: 47, column5: 156, height: "49px" },
        { description: "Wipes/cleans self after a bowel movement.", column3: 48, column5: 157, height: "30px" },
        { description: "Participates when bathing (e.g., Rubbing with soap).", column3: 49, column5: 158, height: "30px" },
        { description: "Washes and dries hands without any help.", column3: 50, column5: 159, height: "30px" },
        { description: "Washes face without any help.", column3: 51, column5: 160, height: "30px" },
        { description: "Bathes without any help.", column3: 52, column5: 161, height: "30px" },
    ];

    // Initialize counters with checkmarks from Table 11-1
    let totalColumn3Checkmarks = table11_1Checkmarks.column3;
    let totalColumn4Checkmarks = table11_1Checkmarks.column4;
    let totalColumn5Checkmarks = table11_1Checkmarks.column5;
    let totalColumn6Checkmarks = table11_1Checkmarks.column6;

    const rowsHtml = table11_2Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") totalColumn3Checkmarks++;

        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") totalColumn4Checkmarks++;

        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") totalColumn5Checkmarks++;

        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") totalColumn6Checkmarks++;

        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 3}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add final TOTAL SCORE row with combined checkmarks from Table 11-1 and Table 11-2
    const totalsRow = `
        <tr style="height: 40px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${totalColumn3Checkmarks}</td>
            <td>${totalColumn4Checkmarks}</td>
            <td>${totalColumn5Checkmarks}</td>
            <td>${totalColumn6Checkmarks}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}

// Function to generate Table 12 content
function generateTable12Content(scholasticData, helperData) {
    const table12Config = [
        { description: "Points to family members when asked to do so.", column3: 54, column5: 162, height: "30px" },
        { description: "Points to 5 body parts on himself when asked to do so.", column3: 55, column5: 163, height: "30px" },
        { description: "Points to 5 named pictured objects when asked to do so.", column3: 56, column5: 164, height: "30px" },
        { description: "Follows one-step instructions that include simple prepositions (e.g., in, on, under, etc.).", column3: 57, column5: 165, height: "50px" },
        { description: "Follows 2-step instructions that include simple preposition.", column3: 58, column5: 166, height: "30px" },
    ];

    // Initialize counters for each column
    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

    // Generate rows with checkmarks and count them
    const rowsHtml = table12Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        // Column 3: Checkmark if TRUE, otherwise blank
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;

        // Column 4: Opposite of Column 3
        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;

        // Column 5: Checkmark if TRUE, otherwise blank
        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;

        // Column 6: Opposite of Column 5
        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

        // Generate the row HTML
        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add totals row at the end
    const totalsRow = `
        <tr style="height: 38px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}
// Function to generate Table 13 content
function generateTable13Content(scholasticData, helperData) {
    const table13Config = [
        { description: "Uses 5-20 recognizable words", column3: 58, column5: 167, height: "30px" },
        { description: "Uses pronouns (e.g., I, me, ako, akin)", column3: 59, column5: 168, height: "30px" },
        { description: "Uses 2-3 words verb-noun combinations (e.g., hingi gatas)", column3: 60, column5: 169, height: "30px" },
        { description: "Names objects in pictures", column3: 61, column5: 170, height: "30px" },
        { description: "Speaks in grammatically correct 2-3 word sentences", column3: 62, column5: 171, height: "30px" },
        { description: "Asks “what” questions", column3: 63, column5: 172, height: "30px" },
        { description: "Asks “who” questions", column3: 64, column5: 173, height: "30px" },
        { description: "Gives account of recent experiences (with prompting) in order of occurrence using past tense", column3: 65, column5: 174, height: "50px" },
    ];

    // Initialize counters for each column
    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

    // Generate rows with checkmarks and count them
    const rowsHtml = table13Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        // Column 3: Checkmark if TRUE, otherwise blank
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;

        // Column 4: Opposite of Column 3
        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;

        // Column 5: Checkmark if TRUE, otherwise blank
        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;

        // Column 6: Opposite of Column 5
        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

        // Generate row HTML with checkmark logic
        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add final row with checkmark totals for each column
    const totalsRow = `
        <tr style="height: 40px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}
// Function to generate Table 14 content
function generateTable14Content(scholasticData, helperData) {
    const table14Config = [
        { description: "Looks in the direction of fallen object.", column3: 66, column5: 175, height: "35px" },
        { description: "Looks for partially hidden object.", column3: 67, column5: 176, height: "35px" },
        { description: "Imitates behavior just seen a few minutes earlier.", column3: 68, column5: 177, height: "35px" },
        { description: "Offers object but will not release it.", column3: 69, column5: 178, height: "35px" },
        { description: "Looks for completely hidden object.", column3: 70, column5: 179, height: "35px" },
        { description: "Exhibits simple pretend play (e.g., feed, put doll to sleep).", column3: 71, column5: 180, height: "35px" },
        { description: "Matches objects.", column3: 72, column5: 181, height: "35px" },
        { description: "Matches 2-3 colors.", column3: 73, column5: 182, height: "35px" },
        { description: "Matches pictures.", column3: 74, column5: 183, height: "35px" },
        { description: "Sorts based on shapes.", column3: 75, column5: 184, height: "35px" },
        { description: "Sorts objects based on 2 attributes (e.g., size and color).", column3: 76, column5: 185, height: "35px" },
        { description: "Arranges objects according to size from smallest to biggest.", column3: 77, column5: 186, height: "35px" },
        { description: "Names 4-6 colors.", column3: 78, column5: 187, height: "35px" },
        { description: "Copies shapes.", column3: 79, column5: 188, height: "35px" },
        { description: "Names 3 animals or vegetables when asked.", column3: 80, column5: 189, height: "35px" },
        { description: "States what common household items are used for.", column3: 81, column5: 190, height: "35px" },
        { description: "Can assemble simple puzzles.", column3: 82, column5: 191, height: "35px" },
        { description: "Demonstrates understanding of opposites (e.g., big and small).", column3: 83, column5: 192, height: "40px" },
        { description: "Points to left and right side of the body.", column3: 84, column5: 193, height: "35px" },
        { description: "Can state what is silly or wrong with pictures.", column3: 85, column5: 194, height: "35px" },
        { description: "Matches upper and lower case letters.", column3: 86, column5: 195, height: "35px" },
    ];

    // Initialize counters for each column
    let column3CheckmarkCount = 0;
    let column4CheckmarkCount = 0;
    let column5CheckmarkCount = 0;
    let column6CheckmarkCount = 0;

    // Generate rows with checkmarks and count them
    const rowsHtml = table14Config.map((rowConfig, index) => {
        const resultColumn3 = scholasticData[rowConfig.column3] || helperData[rowConfig.column3] || "";
        const resultColumn4 = resultColumn3;
        const resultColumn5 = scholasticData[rowConfig.column5] || helperData[rowConfig.column5] || "";
        const resultColumn6 = resultColumn5;

        // Column 3: Checkmark if TRUE, otherwise blank
        const column3Content = resultColumn3 === "TRUE" ? "✔️" : "";
        if (column3Content === "✔️") column3CheckmarkCount++;

        // Column 4: Opposite of Column 3
        const column4Content = resultColumn4 === "TRUE" ? "" : "✔️";
        if (column4Content === "✔️") column4CheckmarkCount++;

        // Column 5: Checkmark if TRUE, otherwise blank
        const column5Content = resultColumn5 === "TRUE" ? "✔️" : "";
        if (column5Content === "✔️") column5CheckmarkCount++;

        // Column 6: Opposite of Column 5
        const column6Content = resultColumn6 === "TRUE" ? "" : "✔️";
        if (column6Content === "✔️") column6CheckmarkCount++;

        // Generate row HTML with checkmark logic
        return `
            <tr style="height: ${rowConfig.height};">
                <td>${index + 1}</td>
                <td style="text-align: left;">${rowConfig.description}</td>
                <td>${column3Content}</td>
                <td>${column4Content}</td>
                <td>${column5Content}</td>
                <td>${column6Content}</td>
            </tr>
        `;
    }).join('');

    // Add final row with checkmark totals for each column
    const totalsRow = `
        <tr style="height: 40px;">
            <td></td>
            <td style="text-align: left; font-weight: bold;">TOTAL SCORE</td>
            <td>${column3CheckmarkCount}</td>
            <td>${column4CheckmarkCount}</td>
            <td>${column5CheckmarkCount}</td>
            <td>${column6CheckmarkCount}</td>
        </tr>
    `;

    return rowsHtml + totalsRow;
}

function calculateAge(birthYear, birthMonth, birthDay, endYear, endMonth, endDay, unit) {
    const startDate = new Date(birthYear, birthMonth - 1, birthDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    let diff = 0;

    switch (unit) {
        case 'Y':
            //pag itung tahun
            diff = endDate.getFullYear() - startDate.getFullYear();
            if (endDate.getMonth() < startDate.getMonth() || (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())) {
                diff--;
            }
            return diff;

        case 'YM':
            // pag itung tahun puas sin bulan
            diff = endDate.getMonth() - startDate.getMonth() + (12 * (endDate.getFullYear() - startDate.getFullYear()));
            if (endDate.getDate() < startDate.getDate()) {
                diff--;
            }
            return diff % 12;

        case 'MD':
            // pag itung sin adlaw puas sin bulan
            const tempStartDate = new Date(startDate.getTime());
            tempStartDate.setFullYear(endDate.getFullYear());
            tempStartDate.setMonth(endDate.getMonth());
            if (endDate < tempStartDate) {
                tempStartDate.setMonth(tempStartDate.getMonth() - 1);
            }
            return (endDate - tempStartDate) / (1000 * 60 * 60 * 24); 

        default:
            return "N/A";
    }
}



