// POOL CONTRACTS
let envylpaddress = '#' 

let envyaddress = '#'

let usdtlpaddress = '#'

let wtrxaddress = '#'

let sunaddress = '#'

let usdtaddress = '#'


//rounding functions
function parseFloat(str, radix) {
  let parts = str.split(".");
  if ( parts.length > 1 ) {
    return parseInt(parts[0], radix) + parseInt(parts[1], radix) / Math.pow(radix, parts[1].length);
  }
  return parseInt(parts[0], radix);
}


function roundToFour(num) {
  return +(Math.floor(num + 'e+4') + 'e-4')
}

function roundToTwo(num) {
  return +(Math.floor(num + 'e+2') + 'e-2')
}

function round(num) {
  return +(Math.floor(num + 'e+0') + 'e-0')
}

function roundToTwoOrFour(num){
  if(num<1) return roundToFour(num)
  return roundToTwo(num)
}

//updateHTML
setInterval(()=>{
   envywithdraw()
   envylpwithdraw()
   usdtlpwithdraw()
   wtrxwithdraw()
   sunwithdraw()
   usdtwithdraw()
}, 5000) //updates every 5000 miliseconds = 5 seconds, slow it down if your having node issues



async function usdtlpwithdraw() {
  usdtlpaddress = await tronWeb.contract().at(usdtlpaddress)
  const rewards0 = await usdtlpaddress.earned(tronWeb.defaultAddress.base58).call()
  document.getElementById('rewards0').innerHTML = roundToTwoOrFour(parseFloat(rewards0._hex, 16)/1e18)
}

async function envywithdraw() {
  envyaddress = await tronWeb.contract().at(envyaddress)
  const rewards1 = await envyaddress.earned(tronWeb.defaultAddress.base58).call()
  document.getElementById('rewards1').innerHTML = roundToTwoOrFour(parseFloat(rewards1._hex, 16)/1e18)
}

async function envylpwithdraw() {
  envylpaddress = await tronWeb.contract().at(envylpaddress)
  const rewards2 = await envylpaddress.earned(tronWeb.defaultAddress.base58).call()
  document.getElementById('rewards2').innerHTML = roundToTwoOrFour(parseFloat(rewards2._hex, 16)/1e18)
}

async function sunwithdraw() {
    sunaddress = await tronWeb.contract().at(sunaddress)
    const rewards3 = await sunaddress.earned(tronWeb.defaultAddress.base58).call()
    document.getElementById('rewards3').innerHTML = roundToTwoOrFour(parseFloat(rewards3._hex, 16)/1e18)
}

async function wtrxwithdraw() {
    wtrxaddress = await tronWeb.contract().at(wtrxaddress)
    const rewards4 = await wtrxaddress.earned(tronWeb.defaultAddress.base58).call()
    document.getElementById('rewards4').innerHTML = roundToTwoOrFour(parseFloat(rewards4._hex, 16)/1e18)
}

async function usdtwithdraw() {
    usdtaddress = await tronWeb.contract().at(usdtaddress)
    const rewards5 = await usdtaddress.earned(tronWeb.defaultAddress.base58).call()
    document.getElementById('rewards5').innerHTML = roundToTwoOrFour(parseFloat(rewards5._hex, 16)/1e18)
}