//paguwaun in tandawan bahgu
function openResultsWindow(
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
    table1Content, table9Content, table10Content, table11_1Content,table11_2Content, table12Content, table13Content, table14Content

) {
    // pagpaawn na sin bagu tab
    const resultsWindow = window.open('', '_blank', 'width=1200,height=600');
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Results for ${fullName}</title>
        <style>
            @media print {
    
    /* pagpaawn sin kolor hapabila iprint */
    
    body {
        -webkit-print-color-adjust: exact; /* For Chrome/Safari */
        print-color-adjust: exact; /* For Firefox */
    }

    /* isangun in mga kolor ha mga lamesahan */
    
    .table1 td,
    .table2 td,
    .table3 td,
    .table4 td,
    .table5 td,
    .table6 td,
    .table7 td,
    .table8 td {
        background-color: inherit; 
    }

    
}


            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                padding: 0;
                background-color: #f4f4f4;
            }
            h1 {
                text-align: center;
                font-size: 20px;
            }
            .tables-container {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
            .table-wrapper {
                display: flex;
                flex-direction: column;
                gap: 10px;
                flex-grow: 1;
                min-width: 0;
            }

            .table11-2 {
                margin-top: 90px; /* spacing mga lamesahan */
            }

            table {
                border-collapse: collapse;
                width: 100%;
                table-layout: fixed;
                background-color: white;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            td {
                border: 1px solid #ddd;
                padding: 5px;
                text-align: center;
                font-size: 10px;
                height: 20px;
            }

            /* Column width for Table 1 */
            .table1 col:nth-child(1) { width: 2%; }
            .table1 col:nth-child(2) { width: 54%; }
            .table1 col:nth-child(3) { width: 11%; }
            .table1 col:nth-child(4) { width: 11%; }
            .table1 col:nth-child(5) { width: 11%; }
            .table1 col:nth-child(6) { width: 11%; }

            /* pagpabuntul sin lamesahan awwal iban hikaruwa */
            
            .table1 td:nth-child(1), .table1 td:nth-child(2),
            .table2 td:nth-child(2) {
                text-align: left;
            }

            
            .bold {
                font-weight: bold;
            }
            
            /* hika-tuh lamesahan */
            
            .table3, table8 {
                border: none;
                box-shadow: none;
            }
            .table3 td, .table3 th, .table8 td, table8 th {
                border: none;
                box-shadow: none;
            }

            /* ikaruwa lameesahan */
            
            .table2 col:nth-child(1) { width: 2%; }
            .table2 col:nth-child(2) { width: 54%; }
            .table2 col:nth-child(3) { width: 11%; }
            .table2 col:nth-child(4) { width: 11%; }
            .table2 col:nth-child(5) { width: 11%; }
            .table2 col:nth-child(6) { width: 11%; }

            
            .table1 { height: calc(20px * 27); } /* 27 bahagi */
            .table2 { height: calc(20px * 12); } /* 12 bahagi */
            .table3 { height: calc(20px * 33); } /* 33 bahagi */
            .table4 { height: calc(20px * 6); }  /* 6 bahagi */
            .table5 td, .table6 td { height: 10px; } 

            /* laggu sin hika lima iban hika-unom lamesahan */
            
            .table5 td:nth-child(1), .table6 td:nth-child(1) { width: 3.20%; }
            .table5 td:nth-child(2), .table6 td:nth-child(2) { width: 33.38%; }
            .table5 td:nth-child(n+3):nth-child(-n+21), 
            .table6 td:nth-child(n+3):nth-child(-n+21)

            /* laggu sin hikapitu lamesahan */
            
            .table7 td:nth-child(1) { width: 3.20%; }
            .table7 td:nth-child(2) { width: 46.73%; }
            .table7 td:nth-child(3), 
            .table7 td:nth-child(4), 
            .table7 td:nth-child(5) { width: 16.69%; }

            /* laggu sin hikawalu lamesahan */
            
            .table8 td:nth-child(1) { width: 3.20%; }
            .table8 td:nth-child(2) { width: 21.7%; }
            .table8 td:nth-child(3) { width: 35%; }
            .table8 td:nth-child(4) { width: 25%; }
            .table8 td:nth-child(5) { width: 15.73%; }

            .table9 td {
                height: 20px; /* pagsibu sin haba ha panagnaan lamesahan */
                font-size: 10px; /* pagsibu sin katan laggu sin batang */
            }

            /* laggu sin hikasiyam lamesahan */
            
            .table9 col:nth-child(1) { width: 2%; }
            .table9 col:nth-child(2) { width: 54%; }
            .table9 col:nth-child(3) { width: 11%; }
            .table9 col:nth-child(4) { width: 11%; }
            .table9 col:nth-child(5) { width: 11%; }
            .table9 col:nth-child(6) { width: 11%; }


            
        </style>
    </head>
    <body>
        <!-- Pag-antup sin panagnaan, hika-upat iban hika-walu lamesahan -->
        
        <div class="tables-container">
            
            <div class="table-wrapper">
                <table class="table1">
                <colgroup>
                    <col style="width: 4%;">
                    <col style="width: 52%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                </colgroup>
                <thead>
                    <tr>
                        <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">SOCIO EMOTIONAL DOMAIN</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                    </tr>
                </thead>
                <tbody>
                    ${table1Content}
                    
                </tbody>
            </table>

                
                <table class="table4">
                    <tbody>
                        <tr>
                            <td colspan="2" class="bold">Interpretation</td>
                            <td colspan="2" class="bold">Code</td>
                            <td colspan="2" class="bold">Standard Score</td>
                        </tr>
                        <tr>
                            <td colspan="2">Suggests a Significant Delay in Overall Development</td>
                            <td colspan="2">S.S.D.O.D.</td>
                            <td colspan="2">69 and below</td>
                        </tr>
                        <tr>
                            <td colspan="2">Suggests Slight Delay in Overall Development</td>
                            <td colspan="2">S.S.I.D.O.D.</td>
                            <td colspan="2">70 - 79</td>
                        </tr>
                        <tr>
                            <td colspan="2">Average Overall Development</td>
                            <td colspan="2">A.D.</td>
                            <td colspan="2">80 - 119</td>
                        </tr>
                        <tr>
                            <td colspan="2">Suggests Slight Advanced Development</td>
                            <td colspan="2">S.S.A.D.</td>
                            <td colspan="2">120 - 129</td>
                        </tr>
                        <tr>
                            <td colspan="2">Suggest Highly Advanced Development</td>
                            <td colspan="2">S.H.A.D.</td>
                            <td colspan="2">130 and above</td>
                        </tr>
                    </tbody>
                </table>

                <table class="table8">
    <colgroup>
        <col style="width: 3.20%;">   <!-- Column 1 -->
        <col style="width: 21.07%;">  <!-- Column 2 -->
        <col style="width: 35%;">     <!-- Column 3 -->
        <col style="width: 25%;">     <!-- Column 4 -->
        <col style="width: 15.73%;">  <!-- Column 5 -->
    </colgroup>
    <tbody>
        
        <tr>
            <td></td>
            <td></td>
            <td class="bold" style="text-align: center;">NAME OF PARENT/GUARDIAN</td>
            <td class="bold" style="text-align: center;">SIGNATURE</td>
            <td class="bold" style="text-align: center;">DATE</td>
        </tr>

        <!-- Row 2: Empty row with reduced height -->
        <tr style="height: 5px; line-height: 5px;">
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
        </tr>

        <!-- Row 3: BoSY Assessment in Column 2 -->
        <tr>
            <td></td>
            <td class="bold" style="text-align: center;">BoSY Assessment</td>
            <td>_______________________________</td>
            <td>______________________</td>
            <td>____________</td>
        </tr>

        <!-- Row 4: Empty row with reduced height -->
        <tr style="height: 5px; line-height: 5px;">
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
            <td style="padding: 0;"></td>
        </tr>

        <!-- Row 5: EoSY Assessment in Column 2 -->
        <tr>
            <td></td>
            <td class="bold" style="text-align: center;">EoSY Assessment</td>
            <td>_______________________________</td>
            <td>______________________</td>
            <td>____________</td>
        </tr>
    </tbody>
</table>


<!-- Hika-siyam lamesahan - dii tumagna -->
<table class="table9">
                <colgroup>
                    <col style="width: 4%;">
                    <col style="width: 52%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                </colgroup>
                <thead>
                    <tr>
                        <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">GROSS MOTOR DOMAIN</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                    </tr>
                </thead>
                <tbody>
                    ${table9Content}
                </tbody>
            </table>

<!-- Hika-hampu lamesahan - dii tumagna -->
<table class="table10">
    <colgroup>
                    <col style="width: 4%;">
                    <col style="width: 52%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                    <col style="width: 11%;">
                </colgroup>
                <thead>
                    <thead>
                        <tr>
                            <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">FINE MOTOR DOMAIN</td>
                            <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                            <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">Observed</td>
                            <td style="text-align: center;">Not Observed</td>
                            <td style="text-align: center;">Observed</td>
                            <td style="text-align: center;">Not Observed</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${table10Content}
                    </tbody>
                </table>

<!-- Hika-amputag-isa lamesahan - dii tumagna -->
<table class="table11">
    <colgroup>
        <col style="width: 4%;">
        <col style="width: 52%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
     </colgroup>
    <thead>
        <thead>
        <tr>
            <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">SELF-HELP DOMAIN</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
            <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
        </tr>
        <tr>
            <td style="text-align: center;">Observed</td>
            <td style="text-align: center;">Not Observed</td>
            <td style="text-align: center;">Observed</td>
            <td style="text-align: center;">Not Observed</td>
        </tr>
        </thead>
            <tbody>
            <tbody>${table11_1Content}</tbody>
    </tbody>
</table>

            </div>

<!-- Pag-antup sin hikaruwa, hikalima, hika-unom iban hika-pito lamesahan -->
            <div class="table-wrapper">
                <table class="table2">
    <colgroup>
        <col style="width: 2%;">
        <col style="width: 54%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
        <col style="width: 11%;">
    </colgroup>
    <tbody>
        
        <tr>
            <td rowspan="2" colspan="2" class="bold">DOMAIN</td>
            <td colspan="2" class="bold" style="text-align: center;">BOSY ASSESSMENT</td>
            <td colspan="2" class="bold" style="text-align: center;">EOSY ASSESSMENT</td>
        </tr>
        <tr>
            <td class="bold" style="text-align: center;">RAW SCORE</td>
            <td class="bold" style="text-align: center;">SCALED SCORE</td>
            <td class="bold" style="text-align: center;">RAW SCORE</td>
            <td class="bold" style="text-align: center;">SCALED SCORE</td>
        </tr>

        
        <tr>
            <td></td>
            <td class="bold">Gross Motor</td>
            <td>${grossMotorRsFirst || "N/A"}</td><td>${grossMotorSsFirst || "N/A"}</td><td>${grossMotorRsSecond || "N/A"}</td><td>${grossMotorSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Fine Motor</td>
            <td>${fineMotorRsFirst || "N/A"}</td><td>${fineMotorSsFirst || "N/A"}</td><td>${fineMotorRsSecond || "N/A"}</td><td>${fineMotorSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Self-Help</td>
            <td>${selfHelpRsFirst || "N/A"}</td><td>${selfhelpSsFirst || "N/A"}</td><td>${selfhelpRsSecond || "N/A"}</td><td>${selfhelpSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Receptive Language</td>
            <td>${receptiveLanguageRsFirst || "N/A"}</td><td>${receptiveLanguageSsFirst || "N/A"}</td><td>${receptiveLanguageRsSecond || "N/A"}</td><td>${receptiveLanguageSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Expressive Language</td>
            <td>${expressiveLanguageRsFirst || "N/A"}</td><td>${expressiveLanguageSsFirst || "N/A"}</td><td>${expressiveLanguageRsSecond || "N/A"}</td><td>${expressiveLanguageSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Cognitive</td>
            <td>${cognitiveRsFirst || "N/A"}</td><td>${cognitiveSsFirst || "N/A"}</td><td>${cognitiveRsSecond || "N/A"}</td><td>${cognitiveSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Socio-Emotional</td>
            <td>${socioEmotionalRsFirst || "N/A"}</td><td>${socioEmotionalSsFirst || "N/A"}</td><td>${socioEmotionalRsSecond || "N/A"}</td><td>${socioEmotionalSsSecond || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Sum of Scaled Scores</td>
            <td colspan="2">${firstScaledScoreTotalSum || "N/A"}</td><td colspan="2">${secondScaledScoreTotalSum || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Standard Score</td>
            <td colspan="2">${firstStandardScoreValue || "N/A"}</td><td colspan="2">${secondStandardScoreValue || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold">Interpretation of Standard Score</td>
            <td colspan="2">${interpretationFirstStandardScoreValue || "N/A"}</td><td colspan="2">${interpretationSecondStandardScoreValue || "N/A"}</td>
        </tr>
    </tbody>
</table>


                <table class="table5">
    <colgroup>
        <col style="width: 3.20%;">
        <col style="width: 33.38%;">
        <col span="19" style="width: 3.34%;">
    </colgroup>
    <tbody>
        <tr>
            
            <td rowspan="2" colspan="2" class="bold" style="background-color: red; color: white; text-align: center;">Scaled Scores</td>
            <td colspan="6" class="bold" style="background-color: #fff3cc; text-align: center;">Suggests Delay in Development</td>
            <td colspan="7" class="bold" style="background-color: #ffe598; text-align: center;">Average Development</td>
            <td colspan="6" class="bold" style="background-color: yellow; text-align: center;">Suggests Advanced Development</td>
        </tr>
        
        <tr>

            <td class="bold" style="background-color: #fff3cc; text-align: center;">1</td>
            <td class="bold" style="background-color: #fff3cc; text-align: center;">2</td>
            <td class="bold" style="background-color: #fff3cc; text-align: center;">3</td>
            <td class="bold" style="background-color: #fff3cc; text-align: center;">4</td>
            <td class="bold" style="background-color: #fff3cc; text-align: center;">5</td>
            <td class="bold" style="background-color: #fff3cc; text-align: center;">6</td>


            <td class="bold" style="background-color: #ffe598; text-align: center;">7</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">8</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">9</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">10</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">11</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">12</td>
            <td class="bold" style="background-color: #ffe598; text-align: center;">13</td>


            <td class="bold" style="background-color: yellow; text-align: center;">14</td>
            <td class="bold" style="background-color: yellow; text-align: center;">15</td>
            <td class="bold" style="background-color: yellow; text-align: center;">16</td>
            <td class="bold" style="background-color: yellow; text-align: center;">17</td>
            <td class="bold" style="background-color: yellow; text-align: center;">18</td>
            <td class="bold" style="background-color: yellow; text-align: center;">19</td>
        </tr>


        <tr>
            <td rowspan="7" class="bold" style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; vertical-align: middle;">BoSY Assessment</td>
            <td class="bold" style="text-align: left;">Gross Motor</td>
            <td id="gmBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="gmBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="gmBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="gmBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="gmBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="gmBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="gmBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="gmBosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>

        <tr>
            <td class="bold" style="text-align: left;">Fine Motor</td>
            <td id="fmBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="fmBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="fmBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="fmBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="fmBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="fmBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="fmBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="fmBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        
        <tr><td class="bold" style="text-align: left;">Self-Help</td>
            <td id="shBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="shBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="shBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="shBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="shBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="shBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="shBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="shBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        <tr><td class="bold" style="text-align: left;">Receptive Language</td>
            <td id="rlBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="rlBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="rlBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="rlBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="rlBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="rlBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="rlBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="rlBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        <tr><td class="bold" style="text-align: left;">Expressive Language</td>
            <td id="elBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="elBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="elBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="elBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="elBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="elBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="elBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="elBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        <tr><td class="bold" style="text-align: left;">Cognitive</td>
            <td id="cogBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="cogBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="cogBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="cogBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="cogBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="cogBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="cogBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="cogBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        <tr><td class="bold" style="text-align: left;">Socio-Emotional</td>
            <td id="seBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="seBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="seBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="seBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="seBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="seBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="seBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="seBosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>

        <tr>
            <td rowspan="7" class="bold" style="writing-mode: vertical-rl; transform: rotate(180deg); text-align: center; vertical-align: middle;">EoSY Assessment</td>
             <td class="bold" style="text-align: left;">Gross Motor</td>
            <td id="gmEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="gmEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="gmEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="gmEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="gmEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="gmEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="gmEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="gmEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <tr>
            <td class="bold" style="text-align: left;">Fine Motor</td>
            <td id="fmEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="fmEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="fmEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="fmEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="fmEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="fmEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="fmEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="fmEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <!-- Repeat similar structure for remaining rows -->
        <tr><td class="bold" style="text-align: left;">Self-Help</td>
            <td id="shEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="shEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="shEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="shEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="shEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="shEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="shEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="shEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <tr><td class="bold" style="text-align: left;">Receptive Language</td>
            <td id="rlEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="rlEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="rlEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="rlEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="rlEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="rlEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="rlEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="rlEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <tr><td class="bold" style="text-align: left;">Expressive Language</td>
            <td id="elEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="elEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="elEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="elEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="elEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="elEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="elEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="elEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <tr><td class="bold" style="text-align: left;">Cognitive</td>
            <td id="cogEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="cogEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="cogEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="cogEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="cogEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="cogEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="cogEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="cogEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        <tr><td class="bold" style="text-align: left;">Socio-Emotional</td>
            <td id="seEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdSix" style="background-color: #fff3cc;"></td>
            <td id="seEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdThirteen" style="background-color: #ffe598;"></td>
            <td id="seEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="seEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="seEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="seEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="seEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="seEosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
    </tbody>
</table>


                <table class="table6">
    <colgroup>
        <col style="width: 3.20%;">
        <col style="width: 33.38%;">
        <col span="19" style="width: 3.34%;"> 
    </colgroup>
    <tbody>
        <!-- Row 1 setup -->
        
            <tr>
            
            <td rowspan="2" colspan="2" class="bold" style="background-color: red; color: white; text-align: center;">Standard Scores</td>
            <td colspan="6" class="bold" style="background-color: #fff3cc; text-align: center;">Suggests Delay in Development</td>
            <td colspan="7" class="bold" style="background-color: #ffe598; text-align: center;">Average Development</td>
            <td colspan="6" class="bold" style="background-color: yellow; text-align: center;">Suggests Advanced Development</td>
        </tr>
            
           <!-- Columns 3 to 8 with light cream background, only Column 3 has "30" -->
            <td style="background-color: #fff3cc; text-align: center; font-size: 8px;">30</td>
            <td style="background-color: #fff3cc; color: #fff3cc; font-size: 8px;">40</td>
            <td style="background-color: #fff3cc; color: #fff3cc; font-size: 8px;">47</td>
            <td style="background-color: #fff3cc; color: #fff3cc; font-size: 8px;">57</td>
            <td style="background-color: #fff3cc; color: #fff3cc; font-size: 8px;">65</td>
            <td style="background-color: #fff3cc; color: #fff3cc; font-size: 8px;">69</td>

            <!-- Columns 9 to 15 with light yellow background, only Column 9 has "70" -->
            <td style="background-color: #ffe598; text-align: center; font-size: 8px;">70</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 8px;">78</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 8px;">88</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 8px;">98</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 6px;">108</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 6px;">115</td>
            <td style="background-color: #ffe598; color: #ffe598; font-size: 6px;">119</td>

            <!-- Columns 16 to 21 with yellow background, only Column 16 has "120" -->
            <td style="background-color: yellow; text-align: left; font-size: 7px;">120</td>
            <td style="background-color: yellow; color: yellow; font-size: 6px;">129</td>
            <td style="background-color: yellow; color: yellow; font-size: 6px;">139</td>
            <td style="background-color: yellow; color: yellow; font-size: 6px;">149</td>
            <td style="background-color: yellow; color: yellow; font-size: 6px;">155</td>
            <td style="background-color: yellow; color: yellow; font-size: 6px;">160</td>
        </tr>


        <tr>
            <td rowspan="2" colspan="2" class="bold" style="text-align: center;">BoSY Assessment</td>

            <td id="standardscorevalueBosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueBosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueBosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueBosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueBosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueBosycellIdSix" style="background-color: #fff3cc;"></td>

            <td id="standardscorevalueBosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueBosycellIdThirteen" style="background-color: #ffe598;"></td>

            <td id="standardscorevalueBosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueBosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueBosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueBosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="standardscorevalueBosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueBosycellIdNineteen" style="background-color: yellow;"></td>
        </tr>
        
        <tr style="height: 50px">
            <td id="bosyStandardScoreDateCellIdOne" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdTwo" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdThree" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdFour" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdFive" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdSix" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdSeven" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdEight" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdNine" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdTen" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdEleven" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdTwelve" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdThirteen" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdFourteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdFifteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdSixteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdSeventeen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdEighteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="bosyStandardScoreDateCellIdNineteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>

        </tr>

        <tr>
            <td rowspan="2" colspan="2" class="bold" style="text-align: center;">EoSY Assessment</td>

            <td id="standardscorevalueEosycellIdOne" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueEosycellIdTwo" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueEosycellIdThree" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueEosycellIdFour" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueEosycellIdFive" style="background-color: #fff3cc;"></td>
            <td id="standardscorevalueEosycellIdSix" style="background-color: #fff3cc;"></td>

            <td id="standardscorevalueEosycellIdSeven" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdEight" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdNine" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdTen" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdEleven" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdTwelve" style="background-color: #ffe598;"></td>
            <td id="standardscorevalueEosycellIdThirteen" style="background-color: #ffe598;"></td>

            <td id="standardscorevalueEosycellIdFourteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueEosycellIdFifteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueEosycellIdSixteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueEosycellIdSeventeen" style="background-color: yellow;"></td>
            <td id="standardscorevalueEosycellIdEighteen" style="background-color: yellow;"></td>
            <td id="standardscorevalueEosycellIdNineteen" style="background-color: yellow;"></td>

        </tr>
        
        <tr style="height: 50px">
            <td id="eosyStandardScoreDateCellIdOne" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdTwo" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdThree" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdFour" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdFive" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdSix" style="background-color: #fff3cc; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdSeven" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdEight" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdNine" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdTen" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdEleven" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdTwelve" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdThirteen" style="background-color: #ffe598; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdFourteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdFifteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdSixteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdSeventeen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdEighteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>
            <td id="eosyStandardScoreDateCellIdNineteen" style="background-color: yellow; writing-mode: vertical-rl; transform: rotate(180deg)"></td>

        </tr>
    </tbody>
</table>


                <table class="table7">
    <colgroup>
        <col style="width: 3.20%;">
        <col style="width: 46.73%;">
        <col style="width: 16.69%;">
        <col style="width: 16.69%;">
        <col style="width: 16.69%;">
    </colgroup>
    <tbody>
        
        <tr>
            <td></td> 
            <td></td> 
            <td class="bold" style="text-align: center;">YEAR</td>
            <td class="bold" style="text-align: center;">MONTH</td>
            <td class="bold" style="text-align: center;">DAY</td>
        </tr>
        
        <tr>
            <td></td>
            <td class="bold" style="text-align: left;">Child's Date of Birth</td>
            <td>${birthYear}</td>
            <td>${birthMonth}</td>
            <td>${birthDay}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold" style="text-align: left;">Date of BoSY Assessment</td>
            <td>${syStart || "N/A"}</td><td>${syStartMonth || "N/A"}</td><td>${systartDay || "N/A"}</td>
        </tr>
        <tr>
                <td></td>
                <td class="bold" style="text-align: left;">Child's Age During BoSY Assessment</td>
                <td>${ChildAgeInYears || "N/A"}</td>
                <td>${ChildAgeRemainMonths || "N/A"}</td>
                <td>${ChildAgeRemainDays || "N/A"}</td>
            </tr>
        <tr>
            <td></td>
            <td class="bold" style="text-align: left;">Date of EoSY Assessment</td>
            <td>${syEnd || "N/A"}</td><td>${syEndtMonth || "N/A"}</td><td>${syEndDay || "N/A"}</td>
        </tr>
        <tr>
            <td></td>
            <td class="bold" style="text-align: left;">Child's Age During EoSY Assessment</td>
            <td>${ChildAgeInYearsEnd || "N/A"}</td>
            <td>${ChildAgeRemainMonthsEnd || "N/A"}</td>
            <td>${ChildAgeRemainDaysEnd || "N/A"}</td>
        </tr>
    </tbody>
</table>
                
            <table class="table11-2" style="margin-top: 50px;">
                <colgroup>
                    <col style="width: 4%;">    <!-- Column 1 -->
                    <col style="width: 52%;">   <!-- Column 2 -->
                    <col style="width: 11%;">   <!-- Column 3 -->
                    <col style="width: 11%;">   <!-- Column 4 -->
                    <col style="width: 11%;">   <!-- Column 5 -->
                    <col style="width: 11%;">   <!-- Column 6 -->
                </colgroup>
                <tbody>
                    
                    <tr>
                        <td colspan="2"></td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                    </tr>
            
                    <tbody>${table11_2Content}</tbody>
                    
                </tbody>
            </table>
            
            
            <table class="table12">
                <colgroup>
                    <col style="width: 4%;">    <!-- Column 1 -->
                    <col style="width: 52%;">   <!-- Column 2 -->
                    <col style="width: 11%;">   <!-- Column 3 -->
                    <col style="width: 11%;">   <!-- Column 4 -->
                    <col style="width: 11%;">   <!-- Column 5 -->
                    <col style="width: 11%;">   <!-- Column 6 -->
                </colgroup>
                <tbody>
                    <!-- Header Rows: Merged cells with custom headers -->
                    <tr>
                        <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">RECEPTIVE LANGUAGE DOMAIN</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                    </tr>
                </thead>
                <tbody>${table12Content}</tbody>
            </table>                
            </div>

            
<div class="table-wrapper">
    <table class="table3">
        <colgroup>
            <col style="width: 3.12%;">   <!-- Column 1 -->
            <col style="width: 25.07%;">  <!-- Column 2 -->
            <col style="width: 28.46%;">  <!-- Column 3 -->
            <col style="width: 10.84%;">  <!-- Column 4 -->
            <col style="width: 10.84%;">  <!-- Column 5 -->
            <col style="width: 10.84%;">  <!-- Column 6 -->
            <col style="width: 10.84%;">  <!-- Column 7 -->
        </colgroup>
        <tbody>
            
            <tr>
            
                <td rowspan="3" colspan="2" style="text-align: center; height: 100px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Seal_of_the_Department_of_Education_of_the_Philippines.png" 
                         alt="DepEd Seal" style="width: 100%; height: 100%; object-fit: contain; display: block;"></td>
                <td colspan="3" style="text-align: center; font-weight: bold; font-size: 15px;">Republic of the Philippines</td>
                <td rowspan="3" colspan="2" style="text-align: center; height: 100px;">
                    <img src="https://www.deped.gov.ph/wp-content/uploads/2021/08/Logo-DepEd-1.png" 
                         alt="DepEd Logo" style="width: 100%; height: 100%; object-fit: contain; display: block;"></td>
            </tr>

            <tr>
                <td colspan="3" style="text-align: center; font-weight: bold; font-size: 17px;">Department of Education</td>
            </tr>

            <tr>
                <td colspan="3"></td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 11px;">Region XI</td>
            </tr>
            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 13px;">Schools Division of Davao City</td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 11px;">Sta. Ana District</td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 18px;">Sta. Ana Central Elementary School</td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 16px; font-family: 'Comic Sans MS', sans-serif;">Philippine Early Childhood</td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-weight: bold; font-size: 16px; font-family: 'Comic Sans MS', sans-serif;">Development Checklist</td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; font-size: 11px;">
                    ECF 1
                </td>
            </tr>

            <tr>
                <td colspan="7" style="text-align: center; height: 340px;">
                    <img src="https://i.imgur.com/jIiSJDK.png" 
                         alt="ECCD Cover Image" style="width: 100%; height: 100%; object-fit: contain; display: block;">
                </td>
            </tr>

            <tr>
                <td colspan"7" style="text-align: center; height: 10px;"></td>
                </tr>
            
            <tr>
                
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: left;">
                    &nbsp;&nbsp;&nbsp;Child's Name:
                </td>
                 <td colspan="3" style="font-size: 13px; font-weight: bold; text-align: left; text-decoration: underline;">${fullName} </td>
                <td style="font-size: 13px; font-weight: bold; text-align: right;">Age:</td>
                <td style="font-size: 13px; font-weight: bold; text-align: center; text-decoration: underline;">${yrsOld || "N/A"}</td>
            </tr>

            <tr>
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: left;">&nbsp;&nbsp;&nbsp;Birthdate:</td>
                <td style="font-size: 13px; font-weight: bold; text-align: left; text-decoration: underline;">${birthday || "N/A"}</td>
                <td></td>
                <td style="font-size: 13px; font-weight: bold; text-align: right;">Sex:</td>
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: left; text-decoration: underline;">${gender || "N/A"}</td>
            </tr>

            <tr>
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: left;">&nbsp;&nbsp;&nbsp;LRN:</td>
                <td style="font-size: 13px; font-weight: bold; text-align: left; text-decoration: underline;">${lrnNumber || "N/A"}</td>
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: right;">School Year:</td>
                <td colspan="2" style="font-size: 13px; font-weight: bold; text-align: left; text-decoration: underline;">${syYear || "N/A"}</td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            
            <tr>
                <td colspan="2" style="font-size: 13px; text-align: left; vertical-align: bottom;">Recorded with:</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7" style="font-size: 13px; text-align: center;">☑ Birth/Baptismal Certificate;&nbsp;&nbsp;&nbsp;☐ Parent(s) Affidavit&nbsp;&nbsp;&nbsp;&nbsp;☐ None</td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7" style="font-size: 13px; font-weight: bold; text-align: center; vertical-align: bottom; text-decoration: underline">${adviserName || "N/A"}</td>
            </tr>
            <tr>
                <td colspan="7" style="font-size: 11px; text-align: center; vertical-align: top;">Name of Adviser</td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7"></td>
            </tr>
            <tr>
                <td colspan="7" style="font-size: 13px; font-weight: bold; text-align: center; vertical-align: bottom; text-decoration: underline">${principalName || "N/A"}</td>
            </tr>
            <tr>
                <td colspan="7" style="font-size: 11px; text-align: center; vertical-align: top;">School Head</td>
            </tr>


        </tbody>
    </table>

<table class="table13" style="margin-top: 5px;">
    <colgroup>
        <col style="width: 4%;">    <!-- Column 1 -->
        <col style="width: 52%;">   <!-- Column 2 -->
        <col style="width: 11%;">   <!-- Column 3 -->
        <col style="width: 11%;">   <!-- Column 4 -->
        <col style="width: 11%;">   <!-- Column 5 -->
        <col style="width: 11%;">   <!-- Column 6 -->
    </colgroup>
                    <thead>
                        <tr>
                            <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">EXPRESSIVE LANGUAGE DOMAIN</td>
                            <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                            <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">Observed</td>
                            <td style="text-align: center;">Not Observed</td>
                            <td style="text-align: center;">Observed</td>
                            <td style="text-align: center;">Not Observed</td>
                        </tr>
                    </thead>
                    <tbody>
                        ${table13Content}
                    </tbody>
                </table>

            <table class="table14">
                <colgroup>
                    <col style="width: 4%;">    <!-- Column 1 -->
                    <col style="width: 52%;">   <!-- Column 2 -->
                    <col style="width: 11%;">   <!-- Column 3 -->
                    <col style="width: 11%;">   <!-- Column 4 -->
                    <col style="width: 11%;">   <!-- Column 5 -->
                    <col style="width: 11%;">   <!-- Column 6 -->
                </colgroup>
                <tbody>
                    <tr>
                        <td rowspan="2" colspan="2" style="text-align: center; font-weight: bold;">COGNITIVE DOMAIN</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">BOSY ASSESSMENT</td>
                        <td colspan="2" style="text-align: center; font-weight: bold;">EOSY ASSESSMENT</td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                        <td style="text-align: center;">Observed</td>
                        <td style="text-align: center;">Not Observed</td>
                    </tr>
                    <tbody>${table14Content}</tbody>
            </table>
                
            </div>





        </div>
    </body>
    </html>
    `;

    // Mga luun sin kahba lamesahan mari
    function generateTable1Rows(rowCount) {
        const column1Texts = Array.from({ length: 24 }, (_, i) => (i + 1).toString()).concat([""]); // Number 1-24, last row blank

        const column2Texts = [
            "Enjoys watching activities of nearby people or animals.",
            "Friendly with strangers but initially may show slight anxiety or shyness.",
            "Plays alone but likes to be near familiar adults or brothers and sisters.",
            "Laughs or squeals aloud in play.",
            "Plays peek-a-boo (bulaga).",
            "Rolls ball interactively with caregiver/examiner.",
            "Hugs or cuddles toys.",
            "Demonstrates respect for elders using terms like “po” and “opo”.",
            "Shares toys with others.",
            "Imitates adult activities (e.g. cooking, washing).",
            "Identifies feelings in others.",
            "Appropriately uses cultural gestures of greeting without much prompting (e.g. mano, bless, kiss, etc.).",
            "Comforts playmates/siblings in distress.",
            "Persists when faced with problem or obstacle to his wants.",
            "Helps with family chores (e.g. wiping tables, watering plants, etc.).",
            "Curious about the environment but knows when to stop asking questions of adults.",
            "Waits for turn.",
            "Asks permission to play with toy being used by another.",
            "Defends possessions with determination.",
            "Plays organized group games fairly (e.g. does not cheat in order to win).",
            "Can talk about difficult feelings (e.g. anger, sadness, worry) he experiences.",
            "Honors a simple bargain with caregiver (e.g. can play outside only after cleaning/fixing his room).",
            "Watches responsibly over younger siblings/family members.",
            "Cooperates with adults and peers in group situations to minimize quarrels and conflicts.",
            "TOTAL SCORE"
        ];

        let rows = '';
        for (let i = 0; i < rowCount; i++) {
            rows += '<tr>';
            rows += `<td>${column1Texts[i] || ''}</td>`;
            rows += `<td>${column2Texts[i] || ''}</td>`;
            for (let j = 2; j < 6; j++) {
                rows += `<td></td>`;
            }
            rows += '</tr>';
        }
        return rows;
    }

    function generateTable2Rows() {
        const column2Texts = [
            "Gross Motor", "Fine Motor", "Self-Help", "Receptive Language",
            "Expressive Language", "Cognitive", "Socio-Emotional",
            "Sum of Scaled Scores", "Standard Score", "Interpretation of Standard Score"
        ];

        let rows = '';
        for (let i = 0; i < column2Texts.length; i++) {
            rows += '<tr>';
            rows += `<td></td>`; 
            rows += `<td class="bold">${column2Texts[i]}</td>`; 
            for (let j = 2; j < 6; j++) {
                rows += `<td></td>`; 
            }
            rows += '</tr>';
        }
        return rows;
    }

    function generateTable3Rows(rowCount, colCount = 7) {
        let rows = '';
        for (let i = 0; i < rowCount; i++) {
            rows += '<tr>';
            for (let j = 0; j < colCount; j++) {
                rows += `<td></td>`;
            }
            rows += '</tr>';
        }
        return rows;
    }



        function generateTableRows(rowCount, colCount = 6) {
            let rows = '';
            for (let i = 0; i < rowCount; i++) {
                rows += '<tr>';
                for (let j = 0; j < colCount; j++) {
                    rows += `<td></td>`;
                }
                rows += '</tr>';
            }
            return rows;
        }

    // mga luun sin bahgu tandawan
    resultsWindow.document.write(htmlContent);
    resultsWindow.document.close();
    resultsWindow.document.getElementById("gmBosycellIdOne").textContent = gmBosySymbolOne; resultsWindow.document.getElementById("gmBosycellIdTwo").textContent = gmBosySymbolTwo; resultsWindow.document.getElementById("gmBosycellIdThree").textContent = gmBosySymbolThree;
    resultsWindow.document.getElementById("gmBosycellIdFour").textContent = gmBosySymbolFour; resultsWindow.document.getElementById("gmBosycellIdFive").textContent = gmBosySymbolFive; resultsWindow.document.getElementById("gmBosycellIdSix").textContent = gmBosySymbolSix;
    resultsWindow.document.getElementById("gmBosycellIdSeven").textContent = gmBosySymbolSeven; resultsWindow.document.getElementById("gmBosycellIdEight").textContent = gmBosySymbolEight; resultsWindow.document.getElementById("gmBosycellIdNine").textContent = gmBosySymbolNine;
    resultsWindow.document.getElementById("gmBosycellIdTen").textContent = gmBosySymbolTen; resultsWindow.document.getElementById("gmBosycellIdEleven").textContent = gmBosySymbolEleven; resultsWindow.document.getElementById("gmBosycellIdTwelve").textContent = gmBosySymbolTwelve;
    resultsWindow.document.getElementById("gmBosycellIdThirteen").textContent = gmBosySymbolThirteen; resultsWindow.document.getElementById("gmBosycellIdFourteen").textContent = gmBosySymbolFourteen; resultsWindow.document.getElementById("gmBosycellIdFifteen").textContent = gmBosySymbolFifteen;
    resultsWindow.document.getElementById("gmBosycellIdSixteen").textContent = gmBosySymbolSixteen; resultsWindow.document.getElementById("gmBosycellIdSeventeen").textContent = gmBosySymbolSeventeen; resultsWindow.document.getElementById("gmBosycellIdEighteen").textContent = gmBosySymbolEighteen;
    resultsWindow.document.getElementById("gmBosycellIdNineteen").textContent = gmBosySymbolNineteen;
    resultsWindow.document.getElementById("fmBosycellIdOne").textContent = fmBosySymbolOne; resultsWindow.document.getElementById("fmBosycellIdTwo").textContent = fmBosySymbolTwo; resultsWindow.document.getElementById("fmBosycellIdThree").textContent = fmBosySymbolThree;
    resultsWindow.document.getElementById("fmBosycellIdFour").textContent = fmBosySymbolFour; resultsWindow.document.getElementById("fmBosycellIdFive").textContent = fmBosySymbolFive; resultsWindow.document.getElementById("fmBosycellIdSix").textContent = fmBosySymbolSix;
    resultsWindow.document.getElementById("fmBosycellIdSeven").textContent = fmBosySymbolSeven; resultsWindow.document.getElementById("fmBosycellIdEight").textContent = fmBosySymbolEight; resultsWindow.document.getElementById("fmBosycellIdNine").textContent = fmBosySymbolNine;
    resultsWindow.document.getElementById("fmBosycellIdTen").textContent = fmBosySymbolTen; resultsWindow.document.getElementById("fmBosycellIdEleven").textContent = fmBosySymbolEleven; resultsWindow.document.getElementById("fmBosycellIdTwelve").textContent = fmBosySymbolTwelve;
    resultsWindow.document.getElementById("fmBosycellIdThirteen").textContent = fmBosySymbolThirteen; resultsWindow.document.getElementById("fmBosycellIdFourteen").textContent = fmBosySymbolFourteen; resultsWindow.document.getElementById("fmBosycellIdFifteen").textContent = fmBosySymbolFifteen;
    resultsWindow.document.getElementById("fmBosycellIdSixteen").textContent = fmBosySymbolSixteen; resultsWindow.document.getElementById("fmBosycellIdSeventeen").textContent = fmBosySymbolSeventeen; resultsWindow.document.getElementById("fmBosycellIdEighteen").textContent = fmBosySymbolEighteen;
    resultsWindow.document.getElementById("fmBosycellIdNineteen").textContent = fmBosySymbolNineteen;
    resultsWindow.document.getElementById("shBosycellIdOne").textContent = shBosySymbolOne; resultsWindow.document.getElementById("shBosycellIdTwo").textContent = shBosySymbolTwo; resultsWindow.document.getElementById("shBosycellIdThree").textContent = shBosySymbolThree;
    resultsWindow.document.getElementById("shBosycellIdFour").textContent = shBosySymbolFour; resultsWindow.document.getElementById("shBosycellIdFive").textContent = shBosySymbolFive; resultsWindow.document.getElementById("shBosycellIdSix").textContent = shBosySymbolSix;
    resultsWindow.document.getElementById("shBosycellIdSeven").textContent = shBosySymbolSeven; resultsWindow.document.getElementById("shBosycellIdEight").textContent = shBosySymbolEight; resultsWindow.document.getElementById("shBosycellIdNine").textContent = shBosySymbolNine;
    resultsWindow.document.getElementById("shBosycellIdTen").textContent = shBosySymbolTen; resultsWindow.document.getElementById("shBosycellIdEleven").textContent = shBosySymbolEleven; resultsWindow.document.getElementById("shBosycellIdTwelve").textContent = shBosySymbolTwelve;
    resultsWindow.document.getElementById("shBosycellIdThirteen").textContent = shBosySymbolThirteen; resultsWindow.document.getElementById("shBosycellIdFourteen").textContent = shBosySymbolFourteen; resultsWindow.document.getElementById("shBosycellIdFifteen").textContent = shBosySymbolFifteen;
    resultsWindow.document.getElementById("shBosycellIdSixteen").textContent = shBosySymbolSixteen; resultsWindow.document.getElementById("shBosycellIdSeventeen").textContent = shBosySymbolSeventeen; resultsWindow.document.getElementById("shBosycellIdEighteen").textContent = shBosySymbolEighteen;
    resultsWindow.document.getElementById("shBosycellIdNineteen").textContent = shBosySymbolNineteen;
    resultsWindow.document.getElementById("rlBosycellIdOne").textContent = rlBosySymbolOne; resultsWindow.document.getElementById("rlBosycellIdTwo").textContent = rlBosySymbolTwo; resultsWindow.document.getElementById("rlBosycellIdThree").textContent = rlBosySymbolThree;
    resultsWindow.document.getElementById("rlBosycellIdFour").textContent = rlBosySymbolFour; resultsWindow.document.getElementById("rlBosycellIdFive").textContent = rlBosySymbolFive; resultsWindow.document.getElementById("rlBosycellIdSix").textContent = rlBosySymbolSix;
    resultsWindow.document.getElementById("rlBosycellIdSeven").textContent = rlBosySymbolSeven; resultsWindow.document.getElementById("rlBosycellIdEight").textContent = rlBosySymbolEight; resultsWindow.document.getElementById("rlBosycellIdNine").textContent = rlBosySymbolNine;
    resultsWindow.document.getElementById("rlBosycellIdTen").textContent = rlBosySymbolTen; resultsWindow.document.getElementById("rlBosycellIdEleven").textContent = rlBosySymbolEleven; resultsWindow.document.getElementById("rlBosycellIdTwelve").textContent = rlBosySymbolTwelve;
    resultsWindow.document.getElementById("rlBosycellIdThirteen").textContent = rlBosySymbolThirteen; resultsWindow.document.getElementById("rlBosycellIdFourteen").textContent = rlBosySymbolFourteen; resultsWindow.document.getElementById("rlBosycellIdFifteen").textContent = rlBosySymbolFifteen;
    resultsWindow.document.getElementById("rlBosycellIdSixteen").textContent = rlBosySymbolSixteen; resultsWindow.document.getElementById("rlBosycellIdSeventeen").textContent = rlBosySymbolSeventeen; resultsWindow.document.getElementById("rlBosycellIdEighteen").textContent = rlBosySymbolEighteen;
    resultsWindow.document.getElementById("rlBosycellIdNineteen").textContent = rlBosySymbolNineteen;
    resultsWindow.document.getElementById("elBosycellIdOne").textContent = elBosySymbolOne; resultsWindow.document.getElementById("elBosycellIdTwo").textContent = elBosySymbolTwo; resultsWindow.document.getElementById("elBosycellIdThree").textContent = elBosySymbolThree;
    resultsWindow.document.getElementById("elBosycellIdFour").textContent = elBosySymbolFour; resultsWindow.document.getElementById("elBosycellIdFive").textContent = elBosySymbolFive; resultsWindow.document.getElementById("elBosycellIdSix").textContent = elBosySymbolSix;
    resultsWindow.document.getElementById("elBosycellIdSeven").textContent = elBosySymbolSeven; resultsWindow.document.getElementById("elBosycellIdEight").textContent = elBosySymbolEight; resultsWindow.document.getElementById("elBosycellIdNine").textContent = elBosySymbolNine;
    resultsWindow.document.getElementById("elBosycellIdTen").textContent = elBosySymbolTen; resultsWindow.document.getElementById("elBosycellIdEleven").textContent = elBosySymbolEleven; resultsWindow.document.getElementById("elBosycellIdTwelve").textContent = elBosySymbolTwelve;
    resultsWindow.document.getElementById("elBosycellIdThirteen").textContent = elBosySymbolThirteen; resultsWindow.document.getElementById("elBosycellIdFourteen").textContent = elBosySymbolFourteen; resultsWindow.document.getElementById("elBosycellIdFifteen").textContent = elBosySymbolFifteen;
    resultsWindow.document.getElementById("elBosycellIdSixteen").textContent = elBosySymbolSixteen; resultsWindow.document.getElementById("elBosycellIdSeventeen").textContent = elBosySymbolSeventeen; resultsWindow.document.getElementById("elBosycellIdEighteen").textContent = elBosySymbolEighteen;
    resultsWindow.document.getElementById("elBosycellIdNineteen").textContent = elBosySymbolNineteen;
    resultsWindow.document.getElementById("cogBosycellIdOne").textContent = cogBosySymbolOne; resultsWindow.document.getElementById("cogBosycellIdTwo").textContent = cogBosySymbolTwo; resultsWindow.document.getElementById("cogBosycellIdThree").textContent = cogBosySymbolThree;
    resultsWindow.document.getElementById("cogBosycellIdFour").textContent = cogBosySymbolFour; resultsWindow.document.getElementById("cogBosycellIdFive").textContent = cogBosySymbolFive; resultsWindow.document.getElementById("cogBosycellIdSix").textContent = cogBosySymbolSix;
    resultsWindow.document.getElementById("cogBosycellIdSeven").textContent = cogBosySymbolSeven; resultsWindow.document.getElementById("cogBosycellIdEight").textContent = cogBosySymbolEight; resultsWindow.document.getElementById("cogBosycellIdNine").textContent = cogBosySymbolNine;
    resultsWindow.document.getElementById("cogBosycellIdTen").textContent = cogBosySymbolTen; resultsWindow.document.getElementById("cogBosycellIdEleven").textContent = cogBosySymbolEleven; resultsWindow.document.getElementById("cogBosycellIdTwelve").textContent = cogBosySymbolTwelve;
    resultsWindow.document.getElementById("cogBosycellIdThirteen").textContent = cogBosySymbolThirteen; resultsWindow.document.getElementById("cogBosycellIdFourteen").textContent = cogBosySymbolFourteen; resultsWindow.document.getElementById("cogBosycellIdFifteen").textContent = cogBosySymbolFifteen;
    resultsWindow.document.getElementById("cogBosycellIdSixteen").textContent = cogBosySymbolSixteen; resultsWindow.document.getElementById("cogBosycellIdSeventeen").textContent = cogBosySymbolSeventeen; resultsWindow.document.getElementById("cogBosycellIdEighteen").textContent = cogBosySymbolEighteen;
    resultsWindow.document.getElementById("cogBosycellIdNineteen").textContent = cogBosySymbolNineteen;
    resultsWindow.document.getElementById("seBosycellIdOne").textContent = seBosySymbolOne; resultsWindow.document.getElementById("seBosycellIdTwo").textContent = seBosySymbolTwo; resultsWindow.document.getElementById("seBosycellIdThree").textContent = seBosySymbolThree;
    resultsWindow.document.getElementById("seBosycellIdFour").textContent = seBosySymbolFour; resultsWindow.document.getElementById("seBosycellIdFive").textContent = seBosySymbolFive; resultsWindow.document.getElementById("seBosycellIdSix").textContent = seBosySymbolSix;
    resultsWindow.document.getElementById("seBosycellIdSeven").textContent = seBosySymbolSeven; resultsWindow.document.getElementById("seBosycellIdEight").textContent = seBosySymbolEight; resultsWindow.document.getElementById("seBosycellIdNine").textContent = seBosySymbolNine;
    resultsWindow.document.getElementById("seBosycellIdTen").textContent = seBosySymbolTen; resultsWindow.document.getElementById("seBosycellIdEleven").textContent = seBosySymbolEleven; resultsWindow.document.getElementById("seBosycellIdTwelve").textContent = seBosySymbolTwelve;
    resultsWindow.document.getElementById("seBosycellIdThirteen").textContent = seBosySymbolThirteen; resultsWindow.document.getElementById("seBosycellIdFourteen").textContent = seBosySymbolFourteen; resultsWindow.document.getElementById("seBosycellIdFifteen").textContent = seBosySymbolFifteen;
    resultsWindow.document.getElementById("seBosycellIdSixteen").textContent = seBosySymbolSixteen; resultsWindow.document.getElementById("seBosycellIdSeventeen").textContent = seBosySymbolSeventeen; resultsWindow.document.getElementById("seBosycellIdEighteen").textContent = seBosySymbolEighteen;
    resultsWindow.document.getElementById("seBosycellIdNineteen").textContent = seBosySymbolNineteen;
    resultsWindow.document.getElementById("gmEosycellIdOne").textContent = gmEosySymbolOne; resultsWindow.document.getElementById("gmEosycellIdTwo").textContent = gmEosySymbolTwo; resultsWindow.document.getElementById("gmEosycellIdThree").textContent = gmEosySymbolThree;
    resultsWindow.document.getElementById("gmEosycellIdFour").textContent = gmEosySymbolFour; resultsWindow.document.getElementById("gmEosycellIdFive").textContent = gmEosySymbolFive; resultsWindow.document.getElementById("gmEosycellIdSix").textContent = gmEosySymbolSix;
    resultsWindow.document.getElementById("gmEosycellIdSeven").textContent = gmEosySymbolSeven; resultsWindow.document.getElementById("gmEosycellIdEight").textContent = gmEosySymbolEight; resultsWindow.document.getElementById("gmEosycellIdNine").textContent = gmEosySymbolNine;
    resultsWindow.document.getElementById("gmEosycellIdTen").textContent = gmEosySymbolTen; resultsWindow.document.getElementById("gmEosycellIdEleven").textContent = gmEosySymbolEleven; resultsWindow.document.getElementById("gmEosycellIdTwelve").textContent = gmEosySymbolTwelve;
    resultsWindow.document.getElementById("gmEosycellIdThirteen").textContent = gmEosySymbolThirteen; resultsWindow.document.getElementById("gmEosycellIdFourteen").textContent = gmEosySymbolFourteen; resultsWindow.document.getElementById("gmEosycellIdFifteen").textContent = gmEosySymbolFifteen;
    resultsWindow.document.getElementById("gmEosycellIdSixteen").textContent = gmEosySymbolSixteen; resultsWindow.document.getElementById("gmEosycellIdSeventeen").textContent = gmEosySymbolSeventeen; resultsWindow.document.getElementById("gmEosycellIdEighteen").textContent = gmEosySymbolEighteen;
    resultsWindow.document.getElementById("gmEosycellIdNineteen").textContent = gmEosySymbolNineteen;
    resultsWindow.document.getElementById("fmEosycellIdOne").textContent = fmEosySymbolOne; resultsWindow.document.getElementById("fmEosycellIdTwo").textContent = fmEosySymbolTwo; resultsWindow.document.getElementById("fmEosycellIdThree").textContent = fmEosySymbolThree;
    resultsWindow.document.getElementById("fmEosycellIdFour").textContent = fmEosySymbolFour; resultsWindow.document.getElementById("fmEosycellIdFive").textContent = fmEosySymbolFive; resultsWindow.document.getElementById("fmEosycellIdSix").textContent = fmEosySymbolSix;
    resultsWindow.document.getElementById("fmEosycellIdSeven").textContent = fmEosySymbolSeven; resultsWindow.document.getElementById("fmEosycellIdEight").textContent = fmEosySymbolEight; resultsWindow.document.getElementById("fmEosycellIdNine").textContent = fmEosySymbolNine;
    resultsWindow.document.getElementById("fmEosycellIdTen").textContent = fmEosySymbolTen; resultsWindow.document.getElementById("fmEosycellIdEleven").textContent = fmEosySymbolEleven; resultsWindow.document.getElementById("fmEosycellIdTwelve").textContent = fmEosySymbolTwelve;
    resultsWindow.document.getElementById("fmEosycellIdThirteen").textContent = fmEosySymbolThirteen; resultsWindow.document.getElementById("fmEosycellIdFourteen").textContent = fmEosySymbolFourteen; resultsWindow.document.getElementById("fmEosycellIdFifteen").textContent = fmEosySymbolFifteen;
    resultsWindow.document.getElementById("fmEosycellIdSixteen").textContent = fmEosySymbolSixteen; resultsWindow.document.getElementById("fmEosycellIdSeventeen").textContent = fmEosySymbolSeventeen; resultsWindow.document.getElementById("fmEosycellIdEighteen").textContent = fmEosySymbolEighteen;
    resultsWindow.document.getElementById("fmEosycellIdNineteen").textContent = fmEosySymbolNineteen;
    resultsWindow.document.getElementById("shEosycellIdOne").textContent = shEosySymbolOne; resultsWindow.document.getElementById("shEosycellIdTwo").textContent = shEosySymbolTwo; resultsWindow.document.getElementById("shEosycellIdThree").textContent = shEosySymbolThree;
    resultsWindow.document.getElementById("shEosycellIdFour").textContent = shEosySymbolFour; resultsWindow.document.getElementById("shEosycellIdFive").textContent = shEosySymbolFive; resultsWindow.document.getElementById("shEosycellIdSix").textContent = shEosySymbolSix;
    resultsWindow.document.getElementById("shEosycellIdSeven").textContent = shEosySymbolSeven; resultsWindow.document.getElementById("shEosycellIdEight").textContent = shEosySymbolEight; resultsWindow.document.getElementById("shEosycellIdNine").textContent = shEosySymbolNine;
    resultsWindow.document.getElementById("shEosycellIdTen").textContent = shEosySymbolTen; resultsWindow.document.getElementById("shEosycellIdEleven").textContent = shEosySymbolEleven; resultsWindow.document.getElementById("shEosycellIdTwelve").textContent = shEosySymbolTwelve;
    resultsWindow.document.getElementById("shEosycellIdThirteen").textContent = shEosySymbolThirteen; resultsWindow.document.getElementById("shEosycellIdFourteen").textContent = shEosySymbolFourteen; resultsWindow.document.getElementById("shEosycellIdFifteen").textContent = shEosySymbolFifteen;
    resultsWindow.document.getElementById("shEosycellIdSixteen").textContent = shEosySymbolSixteen; resultsWindow.document.getElementById("shEosycellIdSeventeen").textContent = shEosySymbolSeventeen; resultsWindow.document.getElementById("shEosycellIdEighteen").textContent = shEosySymbolEighteen;
    resultsWindow.document.getElementById("shEosycellIdNineteen").textContent = shEosySymbolNineteen;
    resultsWindow.document.getElementById("rlEosycellIdOne").textContent = rlEosySymbolOne; resultsWindow.document.getElementById("rlEosycellIdTwo").textContent = rlEosySymbolTwo; resultsWindow.document.getElementById("rlEosycellIdThree").textContent = rlEosySymbolThree;
    resultsWindow.document.getElementById("rlEosycellIdFour").textContent = rlEosySymbolFour; resultsWindow.document.getElementById("rlEosycellIdFive").textContent = rlEosySymbolFive; resultsWindow.document.getElementById("rlEosycellIdSix").textContent = rlEosySymbolSix;
    resultsWindow.document.getElementById("rlEosycellIdSeven").textContent = rlEosySymbolSeven; resultsWindow.document.getElementById("rlEosycellIdEight").textContent = rlEosySymbolEight; resultsWindow.document.getElementById("rlEosycellIdNine").textContent = rlEosySymbolNine;
    resultsWindow.document.getElementById("rlEosycellIdTen").textContent = rlEosySymbolTen; resultsWindow.document.getElementById("rlEosycellIdEleven").textContent = rlEosySymbolEleven; resultsWindow.document.getElementById("rlEosycellIdTwelve").textContent = rlEosySymbolTwelve;
    resultsWindow.document.getElementById("rlEosycellIdThirteen").textContent = rlEosySymbolThirteen; resultsWindow.document.getElementById("rlEosycellIdFourteen").textContent = rlEosySymbolFourteen; resultsWindow.document.getElementById("rlEosycellIdFifteen").textContent = rlEosySymbolFifteen;
    resultsWindow.document.getElementById("rlEosycellIdSixteen").textContent = rlEosySymbolSixteen; resultsWindow.document.getElementById("rlEosycellIdSeventeen").textContent = rlEosySymbolSeventeen; resultsWindow.document.getElementById("rlEosycellIdEighteen").textContent = rlEosySymbolEighteen;
    resultsWindow.document.getElementById("rlEosycellIdNineteen").textContent = rlEosySymbolNineteen;
    resultsWindow.document.getElementById("elEosycellIdOne").textContent = elEosySymbolOne; resultsWindow.document.getElementById("elEosycellIdTwo").textContent = elEosySymbolTwo; resultsWindow.document.getElementById("elEosycellIdThree").textContent = elEosySymbolThree;
    resultsWindow.document.getElementById("elEosycellIdFour").textContent = elEosySymbolFour; resultsWindow.document.getElementById("elEosycellIdFive").textContent = elEosySymbolFive; resultsWindow.document.getElementById("elEosycellIdSix").textContent = elEosySymbolSix;
    resultsWindow.document.getElementById("elEosycellIdSeven").textContent = elEosySymbolSeven; resultsWindow.document.getElementById("elEosycellIdEight").textContent = elEosySymbolEight; resultsWindow.document.getElementById("elEosycellIdNine").textContent = elEosySymbolNine;
    resultsWindow.document.getElementById("elEosycellIdTen").textContent = elEosySymbolTen; resultsWindow.document.getElementById("elEosycellIdEleven").textContent = elEosySymbolEleven; resultsWindow.document.getElementById("elEosycellIdTwelve").textContent = elEosySymbolTwelve;
    resultsWindow.document.getElementById("elEosycellIdThirteen").textContent = elEosySymbolThirteen; resultsWindow.document.getElementById("elEosycellIdFourteen").textContent = elEosySymbolFourteen; resultsWindow.document.getElementById("elEosycellIdFifteen").textContent = elEosySymbolFifteen;
    resultsWindow.document.getElementById("elEosycellIdSixteen").textContent = elEosySymbolSixteen; resultsWindow.document.getElementById("elEosycellIdSeventeen").textContent = elEosySymbolSeventeen; resultsWindow.document.getElementById("elEosycellIdEighteen").textContent = elEosySymbolEighteen;
    resultsWindow.document.getElementById("elEosycellIdNineteen").textContent = elEosySymbolNineteen;
    resultsWindow.document.getElementById("cogEosycellIdOne").textContent = cogEosySymbolOne; resultsWindow.document.getElementById("cogEosycellIdTwo").textContent = cogEosySymbolTwo; resultsWindow.document.getElementById("cogEosycellIdThree").textContent = cogEosySymbolThree;
    resultsWindow.document.getElementById("cogEosycellIdFour").textContent = cogEosySymbolFour; resultsWindow.document.getElementById("cogEosycellIdFive").textContent = cogEosySymbolFive; resultsWindow.document.getElementById("cogEosycellIdSix").textContent = cogEosySymbolSix;
    resultsWindow.document.getElementById("cogEosycellIdSeven").textContent = cogEosySymbolSeven; resultsWindow.document.getElementById("cogEosycellIdEight").textContent = cogEosySymbolEight; resultsWindow.document.getElementById("cogEosycellIdNine").textContent = cogEosySymbolNine;
    resultsWindow.document.getElementById("cogEosycellIdTen").textContent = cogEosySymbolTen; resultsWindow.document.getElementById("cogEosycellIdEleven").textContent = cogEosySymbolEleven; resultsWindow.document.getElementById("cogEosycellIdTwelve").textContent = cogEosySymbolTwelve;
    resultsWindow.document.getElementById("cogEosycellIdThirteen").textContent = cogEosySymbolThirteen; resultsWindow.document.getElementById("cogEosycellIdFourteen").textContent = cogEosySymbolFourteen; resultsWindow.document.getElementById("cogEosycellIdFifteen").textContent = cogEosySymbolFifteen;
    resultsWindow.document.getElementById("cogEosycellIdSixteen").textContent = cogEosySymbolSixteen; resultsWindow.document.getElementById("cogEosycellIdSeventeen").textContent = cogEosySymbolSeventeen; resultsWindow.document.getElementById("cogEosycellIdEighteen").textContent = cogEosySymbolEighteen;
    resultsWindow.document.getElementById("cogEosycellIdNineteen").textContent = cogEosySymbolNineteen;
    resultsWindow.document.getElementById("seEosycellIdOne").textContent = seEosySymbolOne; resultsWindow.document.getElementById("seEosycellIdTwo").textContent = seEosySymbolTwo; resultsWindow.document.getElementById("seEosycellIdThree").textContent = seEosySymbolThree;
    resultsWindow.document.getElementById("seEosycellIdFour").textContent = seEosySymbolFour; resultsWindow.document.getElementById("seEosycellIdFive").textContent = seEosySymbolFive; resultsWindow.document.getElementById("seEosycellIdSix").textContent = seEosySymbolSix;
    resultsWindow.document.getElementById("seEosycellIdSeven").textContent = seEosySymbolSeven; resultsWindow.document.getElementById("seEosycellIdEight").textContent = seEosySymbolEight; resultsWindow.document.getElementById("seEosycellIdNine").textContent = seEosySymbolNine;
    resultsWindow.document.getElementById("seEosycellIdTen").textContent = seEosySymbolTen; resultsWindow.document.getElementById("seEosycellIdEleven").textContent = seEosySymbolEleven; resultsWindow.document.getElementById("seEosycellIdTwelve").textContent = seEosySymbolTwelve;
    resultsWindow.document.getElementById("seEosycellIdThirteen").textContent = seEosySymbolThirteen; resultsWindow.document.getElementById("seEosycellIdFourteen").textContent = seEosySymbolFourteen; resultsWindow.document.getElementById("seEosycellIdFifteen").textContent = seEosySymbolFifteen;
    resultsWindow.document.getElementById("seEosycellIdSixteen").textContent = seEosySymbolSixteen; resultsWindow.document.getElementById("seEosycellIdSeventeen").textContent = seEosySymbolSeventeen; resultsWindow.document.getElementById("seEosycellIdEighteen").textContent = seEosySymbolEighteen;
    resultsWindow.document.getElementById("seEosycellIdNineteen").textContent = seEosySymbolNineteen;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdOne").textContent = bosyStandardScoreOne; resultsWindow.document.getElementById("standardscorevalueBosycellIdTwo").textContent = bosyStandardScoreTwo; resultsWindow.document.getElementById("standardscorevalueBosycellIdThree").textContent = bosyStandardScoreThree;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdFour").textContent = bosyStandardScoreFour; resultsWindow.document.getElementById("standardscorevalueBosycellIdFive").textContent = bosyStandardScoreFive; resultsWindow.document.getElementById("standardscorevalueBosycellIdSix").textContent = bosyStandardScoreSix;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdSeven").textContent = bosyStandardScoreSeven; resultsWindow.document.getElementById("standardscorevalueBosycellIdEight").textContent = bosyStandardScoreEight; resultsWindow.document.getElementById("standardscorevalueBosycellIdNine").textContent = bosyStandardScoreNine;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdTen").textContent = bosyStandardScoreTen; resultsWindow.document.getElementById("standardscorevalueBosycellIdEleven").textContent = bosyStandardScoreEleven; resultsWindow.document.getElementById("standardscorevalueBosycellIdTwelve").textContent = bosyStandardScoreTwelve;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdThirteen").textContent = bosyStandardScoreThirteen; resultsWindow.document.getElementById("standardscorevalueBosycellIdFourteen").textContent = bosyStandardScoreFourteen; resultsWindow.document.getElementById("standardscorevalueBosycellIdFifteen").textContent = bosyStandardScoreFifteen;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdSixteen").textContent = bosyStandardScoreSixteen; resultsWindow.document.getElementById("standardscorevalueBosycellIdSeventeen").textContent = bosyStandardScoreSeventeen; resultsWindow.document.getElementById("standardscorevalueBosycellIdEighteen").textContent = bosyStandardScoreEighteen;
    resultsWindow.document.getElementById("standardscorevalueBosycellIdNineteen").textContent = bosyStandardScoreNineteen;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdOne").textContent = eosyStandardScoreOne; resultsWindow.document.getElementById("standardscorevalueEosycellIdTwo").textContent = eosyStandardScoreTwo; resultsWindow.document.getElementById("standardscorevalueEosycellIdThree").textContent = eosyStandardScoreThree;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdFour").textContent = eosyStandardScoreFour; resultsWindow.document.getElementById("standardscorevalueEosycellIdFive").textContent = eosyStandardScoreFive; resultsWindow.document.getElementById("standardscorevalueEosycellIdSix").textContent = eosyStandardScoreSix;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdSeven").textContent = eosyStandardScoreSeven; resultsWindow.document.getElementById("standardscorevalueEosycellIdEight").textContent = eosyStandardScoreEight; resultsWindow.document.getElementById("standardscorevalueEosycellIdNine").textContent = eosyStandardScoreNine;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdTen").textContent = eosyStandardScoreTen; resultsWindow.document.getElementById("standardscorevalueEosycellIdEleven").textContent = eosyStandardScoreEleven; resultsWindow.document.getElementById("standardscorevalueEosycellIdTwelve").textContent = eosyStandardScoreTwelve;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdThirteen").textContent = eosyStandardScoreThirteen; resultsWindow.document.getElementById("standardscorevalueEosycellIdFourteen").textContent = eosyStandardScoreFourteen; resultsWindow.document.getElementById("standardscorevalueEosycellIdFifteen").textContent = eosyStandardScoreFifteen;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdSixteen").textContent = eosyStandardScoreSixteen; resultsWindow.document.getElementById("standardscorevalueEosycellIdSeventeen").textContent = eosyStandardScoreSeventeen; resultsWindow.document.getElementById("standardscorevalueEosycellIdEighteen").textContent = eosyStandardScoreEighteen;
    resultsWindow.document.getElementById("standardscorevalueEosycellIdNineteen").textContent = eosyStandardScoreNineteen;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdOne").textContent = bosyStandardScoreDateOne; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdTwo").textContent = bosyStandardScoreDateTwo; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdThree").textContent = bosyStandardScoreDateThree;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdFour").textContent = bosyStandardScoreDateFour; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdFive").textContent = bosyStandardScoreDateFive; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdSix").textContent = bosyStandardScoreDateSix;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdSeven").textContent = bosyStandardScoreDateSeven; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdEight").textContent = bosyStandardScoreDateEight; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdNine").textContent = bosyStandardScoreDateNine;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdTen").textContent = bosyStandardScoreDateTen; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdEleven").textContent = bosyStandardScoreDateEleven; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdTwelve").textContent = bosyStandardScoreDateTwelve;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdThirteen").textContent = bosyStandardScoreDateThirteen; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdFourteen").textContent = bosyStandardScoreDateFourteen; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdFifteen").textContent = bosyStandardScoreDateFifteen;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdSixteen").textContent = bosyStandardScoreDateSixteen; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdSeventeen").textContent = bosyStandardScoreDateSeventeen; resultsWindow.document.getElementById("bosyStandardScoreDateCellIdEighteen").textContent = bosyStandardScoreDateEighteen;
    resultsWindow.document.getElementById("bosyStandardScoreDateCellIdNineteen").textContent = bosyStandardScoreDateNineteen;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdOne").textContent = eosyStandardScoreDateOne; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdTwo").textContent = eosyStandardScoreDateTwo; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdThree").textContent = eosyStandardScoreDateThree;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdFour").textContent = eosyStandardScoreDateFour; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdFive").textContent = eosyStandardScoreDateFive; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdSix").textContent = eosyStandardScoreDateSix;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdSeven").textContent = eosyStandardScoreDateSeven; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdEight").textContent = eosyStandardScoreDateEight; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdNine").textContent = eosyStandardScoreDateNine;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdTen").textContent = eosyStandardScoreDateTen; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdEleven").textContent = eosyStandardScoreDateEleven; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdTwelve").textContent = eosyStandardScoreDateTwelve;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdThirteen").textContent = eosyStandardScoreDateThirteen; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdFourteen").textContent = eosyStandardScoreDateFourteen; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdFifteen").textContent = eosyStandardScoreDateFifteen;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdSixteen").textContent = eosyStandardScoreDateSixteen; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdSeventeen").textContent = eosyStandardScoreDateSeventeen; resultsWindow.document.getElementById("eosyStandardScoreDateCellIdEighteen").textContent = eosyStandardScoreDateEighteen;
    resultsWindow.document.getElementById("eosyStandardScoreDateCellIdNineteen").textContent = eosyStandardScoreDateNineteen;


}
