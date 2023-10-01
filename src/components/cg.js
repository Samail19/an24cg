import React,{ useState , useEffect, useRef } from 'react';
import img from '../img/an24.png'

const divSizes = {
  emptyForOrgnCG: {
    height: 0,
    width: 0,
  },
  originalCG: {
    height: 0,
    width: 0,
  },
  crewWgth: {
    height: 0,
    width: 0,
  },
  cabinCrewWght: {
    height: 0,
    width: 0,
  },
  wghtWater: {
    height: 0,
    width: 0,
  },
  pax48: {
    height: 0,
    width: 0,
  },
  paxRaw1_2: {
    height: 0,
    width: 0,
  },
  paxRaw3_4: {
    height: 0,
    width: 0,
  },
  paxRaw5_6: {
    height: 0,
    width: 0,
  },
  paxRaw7_8: {
    height: 0,
    width: 0,
  },
  paxRaw9_10: {
    height: 0,
    width: 0,
  },
  paxRaw11_12: {
    height: 0,
    width: 0,
  },
  cargoOne: {
    height: 0,
    width: 0,
  },
  cargoTwo: {
    height: 0,
    width: 0,
  },
  cargoThree: {
    height: 0,
    width: 0,
  },
  fuel: {
    height: 0,
    width: 0,
  },
  cargoMovement: {
    height: 0,
    width: 0,
  },
  resultingCG: {
    height: 0,
    width: 0,
  },
};

const coordinates = {
  originalCG:{
    x: 0,
    y: 0.5,
  },
  crewWgth: {
    x: 0,
    y: 0.5,
  },
  cabinCrewWght: {
    x: 0,
    y: 0.5,
  },
  paxRaw1_2: {
    x: 0,
    y: 0.5,
  },
  paxRaw3_4: {
    x: 0,
    y: 0.5,
  },
  paxRaw5_6: {
    x: 0,
    y: 0.5,
  },
  paxRaw7_8: {
    x: 0,
    y: 0.5,
  },
  paxRaw9_10: {
    x: 0,
    y: 0.5,
  },
  paxRaw11_12: {
    x: 0,
    y: 0.5,
  },
  cargoOne: {
    x: 0,
    y: 0.5,
  },
  cargoTwo: {
    x: 0,
    y: 0.5,
  },
  cargoThree: {
    x: 0,
    y: 0.5,
  },
  fuel: {
    x: 0,
    y: 0.5,
  },
};


export function InputFields()
{
  const [rampWght, setRampWght] = useState(14000); // вес самолета для центровки
  
  const [pilotWeight, setPilotWeight] = useState(80); // вес пилота
  const [paxWeight, setPaxWeight] = useState(80); // вес пассажира

  const [crewWght, setCrewWght] = useState('');
  const [cabinCrewWght, setCabinCrewWght] = useState('');
  const [equipWght, setEquipWght] = useState('');
  const [paxRaw1_2, setPaxRaw1_2] = useState('');
  const [paxRaw3_4, setPaxRaw3_4] = useState('');
  const [paxRaw5_6, setPaxRaw5_6] = useState('');
  const [paxRaw7_8, setPaxRaw7_8] = useState('');
  const [paxRaw9_10, setPaxRaw9_10] = useState('');
  const [paxRaw11_12, setPaxRaw11_12] = useState('');
  const [cargoOne, setCargoOne] = useState('');
  const [cargoTwo, setCargoTwo] = useState('');
  const [cargoThree, setCargoThree] = useState('');
  const [fuel, setFuel] = useState('');
  
  const [coordCG, setCoordCG] = useState(0); // координаты ЦТ самолета динамически вычисляемые
  const [stateLoaded, setStateLoaded] = useState(false); // индикатор загрузки страницы
  const [emptyCG, setEmptyCG] = useState({originalCG:{x: 0, y: 0}}); // координаты ЦТ самолета пустого
  const [emptyWeight,setEmptyWeight] = useState(14000); // масса пустого самолета
  const [crewCalcWeight,setCrewCalcWeight] = useState(''); // вес экипажа для калькулятора
  const [cabCalcWeight,setCabCalcWeight] = useState(''); // вес буфета для калькулятора
  const [rampCalcWght, setRampCalcWght] = useState(''); // вес самолета для калькулятора
  const [tripFuel, setTripFuel] = useState(''); // расходуемое топливо для кальулятора
  const [landWght, setLandWght] = useState(''); // посадочный вес для кальулятора

  const aircraftCGbase = {
    0:{
      weight: 14000,
      originalCG : {
        x: 0,
        y: 0.1,
      }
    },
    RA46466: {
      weight: 14596,
      originalCG : {
        x: 0.83,
        y: 0.15,
      }
    },
    RA01235: {
      weight: 13900,
      originalCG : {
        x: 0.4,
        y: 0.5,
      }
    },
  };


  function GetSizes()
  {
    Object.keys(divSizes).forEach(key =>{
      divSizes[key].width = document.getElementById(key).clientWidth;
      divSizes[key].height = document.getElementById(key).clientHeight;
    });
  }
  //console.log(`crewWght ${crewWght}`);
  useEffect(() => {
    window.addEventListener("load", () => {  
      setRampCalcWght(aircraftCGbase[0].weight);
      setStateLoaded(true);
      GetSizes();
      //console.log(`onloadCG ${divSizes.emptyForOrgnCG.width + aircraftCGbase[0].originalCG.x}`)
      setCoordCG(divSizes.emptyForOrgnCG.width + aircraftCGbase[0].originalCG.x);
      Object.keys(coordinates).forEach(key =>{
        coordinates[key].x = divSizes.emptyForOrgnCG.width + aircraftCGbase[0].originalCG.x;
      });
      //coordinates.originalCG.x = divSizes.emptyForOrgnCG.width + aircraftCGbase[0].originalCG.x;
    });
  });
    function handleChange(e)
    {
        switch(e.target.name)
        {
            case 'crewWgth': // 2 -5 persons
                let tempCrewWgth = CleanUp(e.target.value);
                let oldCGcrewShift = coordinates['crewWgth'].x;
                let coordDelta = coordinates['originalCG'].x - coordinates['crewWgth'].x;
                if(tempCrewWgth > 5) tempCrewWgth = 5;
                else if (isNaN(tempCrewWgth))
                {
                  tempCrewWgth = '';
                  setCrewWght(tempCrewWgth);
                  
                  console.log(`cabinCrew coordDelta ${coordDelta}`);
                  Object.keys(coordinates).forEach(key =>{
                    if(key != 'originalCG')
                    {
                      if(key == 'crewWgth')coordinates[key].x = coordinates.originalCG.x;
                      else if(key != 'crewWgth') coordinates[key].x = coordinates[key].x  + coordDelta;
                    }
                  });
                } 
                //else if (tempCrewWgth < 2 || tempCrewWgth == '') tempCrewWgth  = 2;
                else
                {
                  //let coordDelta = coordinates['originalCG'].x - coordinates['crewWgth'].x;
                  Object.keys(coordinates).forEach(key =>{
                    if(key != 'originalCG')coordinates[key].x = coordinates[key].x + coordDelta -((divSizes.crewWgth.width)/35)*tempCrewWgth;
                  });
                }  
                //coordinates.crewWgth.x = coordinates.originalCG.x-((divSizes.crewWgth.width)/35)*tempCrewWgth;
                setRampWght(rampWght+tempCrewWgth*pilotWeight - crewWght*pilotWeight);
                setCrewWght(tempCrewWgth);
                setCoordCG(Number(coordCG)-Number(coordinates.crewWgth.x) + Number(oldCGcrewShift));
              break;
            case 'cabinCrewWght': // max 120kg
                let tempCabCrWght = CleanUp(e.target.value);
                let oldCGcabCrewShift = coordinates['cabinCrewWght'].x;
                if(tempCabCrWght > 120) tempCabCrWght = 120;
                else if (tempCabCrWght == '' ) tempCabCrWght = '';
                setCabinCrewWght(tempCabCrWght);
                let coordDeltaCabCr = coordinates['cabinCrewWght'].x - coordinates['crewWgth'].x;
                Object.keys(coordinates).forEach(key =>{
                  if(tempCabCrWght == '')
                  {
                    if(key != 'originalCG' && key != 'crewWgth')coordinates[key].x = coordinates[key].x - coordDeltaCabCr;  
                  }
                  else
                  {
                    if(key != 'originalCG' && key != 'crewWgth') coordinates[key].x = coordinates[key].x - coordDeltaCabCr +((divSizes.cabinCrewWght.width)/77)*(tempCabCrWght/40);
                  }
                });
                setCoordCG(Number(coordCG)+Number(coordinates.cabinCrewWght.x) - Number(oldCGcabCrewShift));
                setRampWght(Number(rampWght) + Number(tempCabCrWght) - cabinCrewWght);
                setCabinCrewWght(tempCabCrWght);
              break;
              
            case 'equipWght': // max 68kg no CG effect
              let tempEquipWght = CleanUp(e.target.value);
              if(tempEquipWght > 200) tempEquipWght = 200;
              else if (tempEquipWght == '' )
              {
                tempEquipWght = '';
                setEquipWght(0);
                setRampWght(rampWght - equipWght);
              } 
              setEquipWght(tempEquipWght);
              setRampWght(rampWght + Number(tempEquipWght) - equipWght);
              break;

            case 'paxRaw1_2': // max 8 persons
              let tempPaxRaw1_2 = CleanUp(e.target.value);
              let oldCGpax1_2_shift = coordinates['paxRaw1_2'].x;
              let coordDeltaRaw1_2 = coordinates['paxRaw1_2'].x - coordinates['cabinCrewWght'].x;
              if(tempPaxRaw1_2 > 8) tempPaxRaw1_2 = 8;
              else if (isNaN(tempPaxRaw1_2) )
              {
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght') coordinates[key].x = coordinates[key].x - coordDeltaRaw1_2;
                 // else if( key == 'paxRaw1_2')coordinates[key].x = coordinates['cabinCrewWght'].x;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght')coordinates[key].x = coordinates[key].x - coordDeltaRaw1_2-((divSizes.paxRaw1_2.width)/53)*(tempPaxRaw1_2/2);
              });
              //coordinates.cabinCrewWght.x = coordinates.originalCG.x-((divSizes.cabinCrewWght.width)/77)*tempCabCrWght;
              setCoordCG(Number(coordCG)-Number(coordinates.paxRaw1_2.x) + Number(oldCGpax1_2_shift));
              setRampWght(rampWght+(tempPaxRaw1_2 - paxRaw1_2)*paxWeight);
              setPaxRaw1_2(tempPaxRaw1_2);
            break;

            case 'paxRaw3_4': // max 8 persons
              let tempPaxRaw3_4 = CleanUp(e.target.value);
              let oldCGpax3_4_shift = coordinates['paxRaw3_4'].x;
              let coordDeltaRaw3_4 = coordinates['paxRaw3_4'].x - coordinates['paxRaw1_2'].x;
              if(tempPaxRaw3_4 > 8) tempPaxRaw3_4 = 8;
              else if (isNaN(tempPaxRaw3_4) )
              {
                tempPaxRaw3_4 = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'&& key != 'paxRaw1_2') coordinates[key].x = coordinates[key].x - coordDeltaRaw3_4;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'& key != 'paxRaw1_2')coordinates[key].x = coordinates[key].x - coordDeltaRaw3_4 - ((divSizes.paxRaw3_4.width)/53)*(tempPaxRaw3_4/4);
              });
              setCoordCG(Number(coordCG)-Number(coordinates.paxRaw3_4.x) + Number(oldCGpax3_4_shift));
              setRampWght(rampWght+(tempPaxRaw3_4 - paxRaw3_4)*paxWeight);
              setPaxRaw3_4(tempPaxRaw3_4);
            break;

            case 'paxRaw5_6': // max 8 persons
              let tempPaxRaw5_6 = CleanUp(e.target.value);
              let oldCGpax5_6_shift = coordinates['paxRaw5_6'].x;
              let coordDeltaRaw5_6 = coordinates['paxRaw5_6'].x - coordinates['paxRaw3_4'].x;
              if(tempPaxRaw5_6 > 8) tempPaxRaw5_6 = 8;
              else if (isNaN(tempPaxRaw5_6))
              {
                tempPaxRaw5_6 = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght' & key != 'paxRaw1_2' & key != 'paxRaw3_4')coordinates[key].x = coordinates[key].x - coordDeltaRaw5_6;
                });
              } 

              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'& key != 'paxRaw1_2' & key != 'paxRaw3_4')coordinates[key].x = coordinates[key].x- coordDeltaRaw5_6 +((divSizes.paxRaw5_6.width)/107)*(tempPaxRaw5_6/8);
              });
              setRampWght(rampWght+(tempPaxRaw5_6 - paxRaw5_6)*paxWeight);
              setCoordCG(Number(coordCG)+Number(coordinates.paxRaw5_6.x) - Number(oldCGpax5_6_shift));
              setPaxRaw5_6(tempPaxRaw5_6);
            break;

            case 'paxRaw7_8': // max 8 persons
              let tempPaxRaw7_8 = CleanUp(e.target.value);
              let oldCGpax7_8_shift = coordinates['paxRaw7_8'].x;
              let coordDeltaRaw7_8 = coordinates['paxRaw7_8'].x - coordinates['paxRaw5_6'].x;
              if(tempPaxRaw7_8 > 8) tempPaxRaw7_8 = 8;
              else if (isNaN(tempPaxRaw7_8))
              {
                tempPaxRaw7_8 = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght' & key != 'paxRaw1_2' & key != 'paxRaw3_4' & key != 'paxRaw5_6')coordinates[key].x = coordinates[key].x + coordDeltaRaw7_8;
                });
              } 

              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'& key != 'paxRaw1_2' & key != 'paxRaw3_4'& key != 'paxRaw5_6')coordinates[key].x = coordinates[key].x - coordDeltaRaw7_8 +((divSizes.paxRaw7_8.width)/35)*(tempPaxRaw7_8/4);
              });
              setRampWght(rampWght+(tempPaxRaw7_8 - paxRaw7_8)*paxWeight);
              setCoordCG(Number(coordCG)+Number(coordinates.paxRaw7_8.x) - Number(oldCGpax7_8_shift));
              setPaxRaw7_8(tempPaxRaw7_8);
            break;

            case 'paxRaw9_10': // max 8 persons
              let tempPaxRaw9_10 = CleanUp(e.target.value);
              let oldCGpax9_10_shift = coordinates['paxRaw9_10'].x;
              let coordDeltaRaw9_10 = coordinates['paxRaw9_10'].x - coordinates['paxRaw7_8'].x;
              if(tempPaxRaw9_10 > 8) tempPaxRaw9_10 = 8;
              else if (isNaN(tempPaxRaw9_10))
              {
                tempPaxRaw9_10 = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght' & key != 'paxRaw1_2' & key != 'paxRaw3_4' & key != 'paxRaw5_6' & key != 'paxRaw7_8')coordinates[key].x = coordinates[key].x + coordDeltaRaw9_10;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'& key != 'paxRaw1_2' & key != 'paxRaw3_4'& key != 'paxRaw5_6' & key != 'paxRaw7_8')coordinates[key].x = coordinates[key].x - coordDeltaRaw9_10 +((divSizes.paxRaw9_10.width)/38)*(tempPaxRaw9_10/2);
              });
              setCoordCG(Number(coordCG)+Number(coordinates.paxRaw9_10.x) - Number(oldCGpax9_10_shift));
              setRampWght(rampWght+(tempPaxRaw9_10 - paxRaw9_10)*paxWeight);
              setPaxRaw9_10(tempPaxRaw9_10);
            break;

            case 'paxRaw11_12': // max 8 persons
              let tempPaxRaw11_12 = CleanUp(e.target.value);
              let oldCGpax11_12_shift = coordinates['paxRaw11_12'].x;
              let coordDeltaRaw11_12 = coordinates['paxRaw11_12'].x - coordinates['paxRaw9_10'].x;
              if(tempPaxRaw11_12 > 8) tempPaxRaw11_12 = 8;
              else if (isNaN(tempPaxRaw11_12))
              {
                tempPaxRaw11_12 = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght' & key != 'paxRaw1_2' & key != 'paxRaw3_4' & key != 'paxRaw5_6' & key != 'paxRaw7_8' & key != 'paxRaw9_10')coordinates[key].x = coordinates[key].x + coordDeltaRaw11_12;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key != 'originalCG' && key != 'crewWgth' && key != 'cabinCrewWght'& key != 'paxRaw1_2' & key != 'paxRaw3_4'& key != 'paxRaw5_6' & key != 'paxRaw7_8' & key != 'paxRaw9_10')coordinates[key].x = coordinates[key].x - coordDeltaRaw11_12 +((divSizes.paxRaw11_12.width)/53)*(tempPaxRaw11_12/1);
              });
              setCoordCG(Number(coordCG)+Number(coordinates.paxRaw11_12.x) - Number(oldCGpax11_12_shift));
              setRampWght(rampWght+(tempPaxRaw11_12 - paxRaw11_12)*paxWeight);
              setPaxRaw11_12(tempPaxRaw11_12);
            break;

            case 'cargoOne': // max 1500kg
              let tempCargoOne = CleanUp(e.target.value);
              let oldCGcargoOne_shift = coordinates['cargoOne'].x;
              let coordDeltaCargoOne = coordinates['cargoOne'].x - coordinates['paxRaw11_12'].x;
              if(tempCargoOne > 1500) tempCargoOne = 1500;
              else if (isNaN(tempCargoOne))
              {
                tempCargoOne = '';
                Object.keys(coordinates).forEach(key =>{
                  if(key == 'cargoOne' || key == 'cargoTwo' || key == 'cargoThree') coordinates[key].x = coordinates[key].x + coordDeltaCargoOne;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key == 'cargoOne' || key == 'cargoTwo' || key == 'cargoThree') coordinates[key].x = coordinates[key].x - coordDeltaCargoOne -((divSizes.cargoOne.width)/39)*(tempCargoOne/100);
              });
              setCoordCG(Number(coordCG) - Number(coordinates.cargoOne.x) + Number(oldCGcargoOne_shift));
              setRampWght(Number(rampWght) + Number(tempCargoOne) - cargoOne);
              setCargoOne(tempCargoOne);
            break;

            case 'cargoTwo': // max 600 kg
              let tempCargoTwo = CleanUp(e.target.value);
              let oldCGcargoTwo_shift = coordinates['cargoTwo'].x;
              let coordDeltaCargoTwo = coordinates['cargoTwo'].x - coordinates['cargoOne'].x;
              if(tempCargoTwo > 600) tempCargoTwo = 600;
              else if (isNaN(tempCargoTwo))
              {
                tempCargoTwo = '';
                Object.keys(coordinates).forEach(key =>{
                  if( key == 'cargoTwo' || key == 'cargoThree') coordinates[key].x = coordinates[key].x + coordDeltaCargoTwo;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key == 'cargoTwo' || key == 'cargoThree') coordinates[key].x = coordinates[key].x - coordDeltaCargoTwo + ((divSizes.cargoTwo.width)/41)*(tempCargoTwo/50);
              });
              setCoordCG(Number(coordCG)+Number(coordinates.cargoTwo.x) - Number(oldCGcargoTwo_shift));
              setRampWght(Number(rampWght) + Number(tempCargoTwo) - cargoTwo);
              setCargoTwo(tempCargoTwo);
            break;

            case 'cargoThree': // max 570 kg
              let tempCargoThree = CleanUp(e.target.value);
              let oldCGcargoThree_shift = coordinates['cargoThree'].x;
              let coordDeltaCargoThree = coordinates['cargoThree'].x - coordinates['cargoTwo'].x;
              if(tempCargoThree > 570) tempCargoThree = 570;
              else if (isNaN(tempCargoThree))
              {
                tempCargoThree = '';
                Object.keys(coordinates).forEach(key =>{
                  if( key == 'cargoThree' )  coordinates[key].x = coordinates[key].x + coordDeltaCargoThree;
                });
              } 
              
              Object.keys(coordinates).forEach(key =>{
                if(key == 'cargoThree') coordinates[key].x = coordinates[key].x - coordDeltaCargoThree + ((divSizes.cargoThree.width)/39)*(tempCargoThree/50);
              });
              setCoordCG(Number(coordCG)+Number(coordinates.cargoThree.x) - Number(oldCGcargoThree_shift));
              setRampWght(Number(rampWght) + Number(tempCargoThree) - cargoThree);
              setCargoThree(tempCargoThree);
            break;

            case 'fuel': // max 3950 kg no CG effect
              let tempFuel = CleanUp(e.target.value);
              if(tempFuel > 3950) tempFuel = 3950;
              else if (tempFuel == '' )
              {
                tempFuel = '';
                setRampWght(Number(rampWght) - fuel);
              } 
              setRampWght(Number(rampWght) + Number(tempFuel) - fuel);
              setFuel(tempFuel);
              setRampCalcWght(rampCalcWght - fuel + Number(tempFuel));
              break;

            case 'pilotWeight': // 80kg default
              let tempPilotWeight = CleanUp(e.target.value);
              if(tempPilotWeight > 120) tempPilotWeight = 120;
              else if (tempPilotWeight == '' ) tempPilotWeight = 0;
              setPilotWeight(tempPilotWeight);
              break;

            case 'paxWeight': // 80kg default
              let tempPaxWeight = CleanUp(e.target.value);
              if(tempPaxWeight > 120) tempPaxWeight = 120;
              else if (tempPaxWeight == '' ) tempPaxWeight = 0;
              setPaxWeight(tempPaxWeight);
              break;
            
            case 'crewCalcWeight':
              let tempСrewCalcWeight = CleanUp(e.target.value);
              if(tempСrewCalcWeight > 500) tempСrewCalcWeight = 500;
              else if (tempСrewCalcWeight == '' ) tempСrewCalcWeight = '';
              setCrewCalcWeight(tempСrewCalcWeight);
              setRampCalcWght(rampCalcWght - crewCalcWeight + Number(tempСrewCalcWeight));
              break;

            case 'cabCalcWeight':
              let tempСabCalcWeight = CleanUp(e.target.value);
              if(tempСabCalcWeight > 200) tempСabCalcWeight = 200;
              else if (tempСabCalcWeight == '' ) tempСabCalcWeight = '';
              setCabCalcWeight(tempСabCalcWeight);
              setRampCalcWght(rampCalcWght - cabCalcWeight + Number(tempСabCalcWeight));
              break;
              
            case 'tripFuel':
              let tempTripFuel= CleanUp(e.target.value);
              if(tempTripFuel > 3950) tempTripFuel = 3950;
              else if (tempTripFuel == '' ) tempTripFuel = '';
              setTripFuel(tempTripFuel);
              setRampCalcWght(rampCalcWght - cabCalcWeight + Number(tempСabCalcWeight));
              break;
        }
    }
    function CleanUp(value)
    {
        return value.replace(/[^0-9]+/i, "");
    }
    //console.log(`coorgCG ${coordCG}`);
    function InitializeCG(e)
    {
      setEmptyCG(aircraftCGbase[e.target.value]);
      setEmptyWeight(aircraftCGbase[e.target.value].weight);
      setRampCalcWght(aircraftCGbase[e.target.value].weight);
      if(stateLoaded != false)
      {
        Object.keys(coordinates).forEach(key =>{
          coordinates[key].x = divSizes.emptyForOrgnCG.width + aircraftCGbase[e.target.value].originalCG.x*divSizes.originalCG.width;
          ResetForm();
        });
        console.log(`crewWgth x ${coordinates['crewWgth'].x} orgnCG ${coordinates.originalCG.x}`);
        setCoordCG(divSizes.emptyForOrgnCG.width + (aircraftCGbase[e.target.value].originalCG.x)*divSizes.originalCG.width);
        setRampWght(aircraftCGbase[e.target.value].weight);
      } 
    }

    function ResetForm()
    {
      setCrewWght('');
      setCabinCrewWght('');
      setEquipWght(0);
      setPaxRaw1_2('');
      setPaxRaw3_4('');
      setPaxRaw5_6('');
      setPaxRaw7_8('');
      setPaxRaw9_10('');
      setPaxRaw11_12('');
      setCargoOne('');
      setCargoTwo('');
      setCargoThree('');
      setFuel('');
    }
    return (
      <>
      <div className='image1'>
        <div className='rawHeader'>
          <div className='weightCalc1'>
            <div className='noMargin'>
            <p className='whiteField'>{emptyWeight}</p>
            </div>
            <div className='noMargin'>
            <input type="text" className="inputACWghts" name={"equipWght"} value={equipWght} onChange={handleChange}></input>
            </div>
            <div className='noMargin'>
            <p className='whiteField'>{Number(emptyWeight) + Number(equipWght)}</p>
            </div>
          </div>
          <div className='weightCalc2'>
            <div className='noMargin'>
            <p className='whiteField'>{Number(emptyWeight) + Number(equipWght)}</p>
            </div>
            <div className='noMargin'>
            <input type="text" className="inputACWghts" name={"crewCalcWeight"} value={crewCalcWeight} onChange={handleChange}></input>
            </div>
            <div className='noMargin'>
            <input type="text" className="inputACWghts" name={"cabCalcWeight"} value={cabCalcWeight} onChange={handleChange}></input>
            </div>
            <div className='noMargin'>
            <input type="text" className="inputACWghts" name={"fuel"} value={fuel} onChange={handleChange}></input>
            </div>
            <div className='noMargin'>
            <p className='whiteField'>{rampCalcWght}</p>
            </div>
            <div className='noMargin'>
            <p className='whiteField'>{22500 - Number(rampCalcWght)}</p>
            </div>
          </div>
          <div className='aircraftReg'>
          <select id='acReg' onChange={(e) => {InitializeCG(e)}}>
              <option value='0'>---</option>
              <option value='RA46466'>RA46466</option>
              <option value='RA01235'>RA01235</option>
            </select>
            <div>
            <input type="text" className="inputWghts" name={"pilotWeight"} value={pilotWeight} onChange={handleChange}></input>
            Вес 1 пилота
            </div>
            <div>
            <input type="text" className="inputWghts" name={"paxWeight"} value={paxWeight} onChange={handleChange}></input>
            Вес 1 пассажира
            </div>
            <p className='weight'>
            {rampWght} Масса,кг
            </p>
          </div>
        </div>
        <div className='rawCG'>
          <div className='emptyForOrgnCG' id='emptyForOrgnCG'></div>
          <div className='originalCG' id='originalCG'>{stateLoaded ? <Canvas name='originalCG' size={divSizes} coordprev={null} coordcur={emptyCG.originalCG}/>:<></>}</div>
        </div>
        
        <div className='raw'>
          <div className='cgLines' id='crewWgth'>{stateLoaded ?<Canvas name='crewWgth' size={divSizes} coordprev={coordinates.originalCG} coordcur={coordinates.crewWgth}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"crewWgth"} value={crewWght} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='cabinCrewWght'>{stateLoaded ?<Canvas name='cabinCrewWght' size={divSizes} coordprev={coordinates.crewWgth} coordcur={coordinates.cabinCrewWght}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"cabinCrewWght"} value={cabinCrewWght} onChange={handleChange}></input>
          </div>
        </div>
        <div className='rawNoCGeffect'>
          <div className='cgLines' id='wghtWater'>{stateLoaded ?<Canvas name='wghtWater' size={divSizes} coordprev={coordinates.cabinCrewWght} coordcur={coordinates.cabinCrewWght}/>:<></>}</div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='pax48'>{stateLoaded ?<Canvas name='pax48' size={divSizes} coordprev={coordinates.cabinCrewWght} coordcur={coordinates.cabinCrewWght}/>:<></>}</div>
          <div className='inputFieldCrew'></div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw1_2'>{stateLoaded ?<Canvas name='paxRaw1_2' size={divSizes} coordprev={coordinates.cabinCrewWght} coordcur={coordinates.paxRaw1_2}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw1_2"} value={paxRaw1_2} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw3_4'>{stateLoaded ?<Canvas name='paxRaw3_4' size={divSizes} coordprev={coordinates.paxRaw1_2} coordcur={coordinates.paxRaw3_4}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw3_4"} value={paxRaw3_4} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw5_6'>{stateLoaded ?<Canvas name='paxRaw5_6' size={divSizes} coordprev={coordinates.paxRaw3_4} coordcur={coordinates.paxRaw5_6}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw5_6"} value={paxRaw5_6} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw7_8'>{stateLoaded ?<Canvas name='paxRaw7_8' size={divSizes} coordprev={coordinates.paxRaw5_6} coordcur={coordinates.paxRaw7_8}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw7_8"} value={paxRaw7_8} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw9_10'>{stateLoaded ?<Canvas name='paxRaw9_10' size={divSizes} coordprev={coordinates.paxRaw7_8} coordcur={coordinates.paxRaw9_10}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw9_10"} value={paxRaw9_10} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw'>
          <div className='cgLines' id='paxRaw11_12'>{stateLoaded ?<Canvas name='paxRaw11_12' size={divSizes} coordprev={coordinates.paxRaw9_10} coordcur={coordinates.paxRaw11_12}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"paxRaw11_12"} value={paxRaw11_12} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw2'>
          <div className='cgLines' id='cargoOne'>{stateLoaded ?<Canvas name='cargoOne' size={divSizes} coordprev={coordinates.paxRaw11_12} coordcur={coordinates.cargoOne}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"cargoOne"} value={cargoOne} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw2'>
          <div className='cgLines' id='cargoTwo'>{stateLoaded ?<Canvas name='cargoTwo' size={divSizes} coordprev={coordinates.cargoOne} coordcur={coordinates.cargoTwo}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"cargoTwo"} value={cargoTwo} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw2'>
          <div className='cgLines' id='cargoThree'>{stateLoaded ?<Canvas name='cargoThree' size={divSizes} coordprev={coordinates.cargoTwo} coordcur={coordinates.cargoThree}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={"cargoThree"} value={cargoThree} onChange={handleChange}></input>
          </div>
        </div>
        <div className='raw3'>
          <div className='cgLines' id='fuel'>{stateLoaded ?<Canvas name='fuel' size={divSizes} coordprev={coordinates.cargoThree} coordcur={coordinates.cargoThree}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <p className='whiteField2'>{fuel}</p>
          
          </div>
        </div>
        <div className='rawNoCGeffect2'>
          <div className='cgLines' id='cargoMovement'>{stateLoaded ?<Canvas name='cargoMovement' size={divSizes} coordprev={coordinates.cargoThree} coordcur={coordinates.cargoThree}/>:<></>}</div>
        </div>
        <div className='rawNoCGeffect3'>
          <div className='cgLines' id='cargoMovement'>{stateLoaded ?<Canvas name='cargoMovement' size={divSizes} coordprev={coordinates.cargoThree} coordcur={coordinates.cargoThree}/>:<></>}</div>
        </div>
        <div className='resultingCG' id='resultingCG'>{stateLoaded ? <Canvas name='resultingCG' size={divSizes} coordprev={coordinates.cargoThree} coordcur={coordinates.cargoThree} mass={rampWght}/>:<></>}</div>
        <div className='weightCalc3'>
            <div className='noMargin'>
            <p className='whiteField'>{rampCalcWght}</p>
            </div>
            <div className='noMargin'>
            <p className='whiteField'>{Number(emptyWeight) + Number(equipWght)}</p>
            </div>
            <div className='noMargin'>
            <input type="text" className="inputACWghts" name={"tripFuel"} value={tripFuel} onChange={handleChange}></input>
            </div>
            <div className='noMargin'>
            <p className='whiteField'>{Number(emptyWeight) + Number(equipWght)}</p>
            </div>
          </div>
      </div>
          

      
    </>
  );
}
//<div className='originalCG'><canvas ref={canvasRefCG} className="main"></canvas></div> size={divSizes.originalCG} 
function Canvas(props)
{
  //console.log(`canvas ${props.name} loaded ${props.coordcur.x}`);
 //debugger;
  const canvasRef = useRef(null);
  
  const draw = (ctx) => {
    //ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    switch(props.name)
    {
      case 'originalCG':
        ctx.fillStyle = 'black';
        ctx.fillRect(props.coordcur.x*divSizes[props.name].width,props.coordcur.y*divSizes[props.name].height,4,(divSizes[props.name].height-props.coordcur.y*divSizes[props.name].height+1));
        ctx.fillStyle = 'red';
        ctx.fillRect(props.coordcur.x*divSizes[props.name].width,props.coordcur.y*divSizes[props.name].height,4,4);
        break;
      case 'crewWgth':
      case 'paxRaw1_2':
      case 'paxRaw3_4':
      case 'cargoOne':
        let firstVerticalLineLeft = {
          startX: props.coordprev.x,
          startY: 0,
          width: 4,
          height:divSizes[props.name].height * 0.5,
        }
        let horisontalLineLeft = {
          startX: props.coordcur.x + 4,
          startY: divSizes[props.name].height * 0.5,
          width: props.coordprev.x - props.coordcur.x,
          height: 4,
        }
        let redPointLeft = {
          startX: props.coordcur.x,
          startY: 0.5*divSizes[props.name].height,
          width: 4,
          height: 4,
        }
        let secondVerticalLineLeft = {
          startX: props.coordcur.x,
          startY: 0.5*divSizes[props.name].height,
          width: 4,
          height: divSizes[props.name].height * 0.5,
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(firstVerticalLineLeft.startX, firstVerticalLineLeft.startY ,firstVerticalLineLeft.width,firstVerticalLineLeft.height);
        ctx.fillRect(horisontalLineLeft.startX, horisontalLineLeft.startY ,horisontalLineLeft.width,horisontalLineLeft.height);
        ctx.fillRect(secondVerticalLineLeft.startX, secondVerticalLineLeft.startY ,secondVerticalLineLeft.width,secondVerticalLineLeft.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(redPointLeft.startX,redPointLeft.startY,redPointLeft.width,redPointLeft.height);
        break;
      case 'cabinCrewWght':
      case 'paxRaw5_6':
      case 'paxRaw7_8':
      case 'paxRaw9_10':
      case 'paxRaw11_12':
      case 'cargoTwo':
      case 'cargoThree':
        let firstVerticalLineRight = {
          startX: props.coordprev.x,
          startY: 0,
          width: 4,
          height:divSizes[props.name].height * 0.5,
        }
        let horisontalLineRight = {
          startX: props.coordprev.x,
          startY: divSizes[props.name].height * 0.5,
          width: props.coordcur.x - props.coordprev.x ,
          height: 4,
        }
        let redPointRight = {
          startX: props.coordcur.x,
          startY: 0.5*divSizes[props.name].height,
          width: 4,
          height: 4,
        }
        let secondVerticalLineRight = {
          startX: props.coordcur.x,
          startY: 0.5*divSizes[props.name].height,
          width: 4,
          height: divSizes[props.name].height * 0.5,
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(firstVerticalLineRight.startX, firstVerticalLineRight.startY ,firstVerticalLineRight.width,firstVerticalLineRight.height);
        ctx.fillRect(horisontalLineRight.startX, horisontalLineRight.startY ,horisontalLineRight.width,horisontalLineRight.height);
        ctx.fillRect(secondVerticalLineRight.startX, secondVerticalLineRight.startY ,secondVerticalLineRight.width,secondVerticalLineRight.height+6);
        ctx.fillStyle = 'red';
        ctx.fillRect(redPointRight.startX,redPointRight.startY,redPointRight.width,redPointRight.height);
        break;
        
        case 'resultingCG':
          let yCoord = ((22000 - props.mass)/1000)/8;
          console.log(`yCoord ${yCoord}`);
          let resultVerticalLine = {
            startX: props.coordprev.x,
            startY: 0,
            width: 4,
            height:divSizes[props.name].height * yCoord,
          }
          let redPointCG = {
            startX: props.coordcur.x,
            startY: yCoord*divSizes[props.name].height,
            width: 4,
            height: 4,
          }
          ctx.fillStyle = 'black';
          ctx.fillRect(resultVerticalLine.startX, resultVerticalLine.startY ,resultVerticalLine.width,resultVerticalLine.height);
          ctx.fillStyle = 'red';
          ctx.fillRect(redPointCG.startX,redPointCG.startY,redPointCG.width,redPointCG.height);
        break;
      default:
          let VerticalLine = {
            startX: props.coordprev.x,
            startY: 0,
            width: 4,
            height:divSizes[props.name].height,
          }
          ctx.fillStyle = 'black';
          ctx.fillRect(VerticalLine.startX, VerticalLine.startY ,VerticalLine.width,VerticalLine.height);
    }
  }

  const cleanCtx = (ctx) => {
    ctx.clearRect(0,0,divSizes[props.name].width,divSizes[props.name].height);
  }

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    cleanCtx(context);
    draw(context);
  })

  return <canvas ref={canvasRef} {...props}  width={divSizes[props.name].width} height={divSizes[props.name].height}/>
}

/*
function LineCG(props)
{

  return (
    <div className='raw'>
      <div className='cgLines' id={props.name}>{props.state ?<Canvas name={props.name} size={divSizes} coordprev={coordinates[props.name]} coordcur={coordinates[props.name]}/>:<></>}</div>
          <div className='inputFieldCrew'>
          <input type="text" className="input" name={[props.name]} value={[props.name]} onChange={handleChange}></input>
          </div>
    </div>
  );
}*/