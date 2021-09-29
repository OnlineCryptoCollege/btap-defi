import BTAP_Token from './abi'


const tokenAddress = '0xe251f9bc3e1ccb247847d3af28c4fa9b9c180a47' // staked token/lp contract address

const btapAddress = '0xe251f9bc3e1ccb247847d3af28c4fa9b9c180a47' //btap contract

const stakingAddress = 'POOLCONTRACTHERE'// pool contract

let tokenInstance = undefined
let btapInstance = undefined
let stakingInstance = undefined

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
   updateTokenBalance()
   updateStakedBalance()
   updateRewards()
}, 5000) //updates every 5000 miliseconds = 5 seconds, slow it down if your having node issues

//functions
async function updateTokenBalance() {
const web3 = window.web3

const accounts = await web3.eth.getAccounts()
const myaccount = accounts[0]

const networkId = await web3.eth.net.getId()

const btapTokenData = BTAP_Token.networks[networkId]
if(btapTokenData) {
  const btapToken = new web3.eth.Contract(BTAP_Token.abi, btapTokenData.address)
  btapTokenBalance = await btapToken.methods.balanceOf(myaccount).call()
  document.getElementById('tokenBalance').innerHTML = roundToTwoOrFour(parseFloat(tokenBalance.constant_result[0],16)/1e18)
} else {
      window.alert('BTAP_Token contract not deployed to detected network.')
}
}

async function updateStakedBalance() {
const web3 = window.web3

const accounts = await web3.eth.getAccounts()
const myaccount = accounts[0]

const networkId = await web3.eth.net.getId()

  const stakingInstance = new web3.eth.Contract(LP_Token.abi, lpTokenData.address)
  const stakedBalance = await stakingInstance.balanceOf(tronWeb.defaultAddress.base58).call()
  document.getElementById('stakedBalance').innerHTML = roundToTwoOrFour(parseFloat(stakedBalance._hex, 16)/1e18)
}

async function updateRewards() {
  stakingInstance = await tronWeb.contract().at(stakingAddress)
  const rewards = await stakingInstance.earned(tronWeb.defaultAddress.base58).call()
  document.getElementById('rewards').innerHTML = roundToTwoOrFour(parseFloat(rewards._hex, 16)/1e18)
}

async function stake() {
  stakingInstance = await tronWeb.contract().at(stakingAddress)
  const amount = document.getElementById('tokenAmount').value*1e18
  const options = {
        feeLimit:100000000,
        callValue:0,
  }
  const transaction = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(tokenAddress), "approve(address,uint256)", options,
                      [{type:'address',value:tronWeb.address.toHex(stakingAddress)},{type:'uint256',value:amount}],tronWeb.defaultAddress.hex)
  const rawTransaction = await tronWeb.trx.sign(transaction.transaction)
  await tronWeb.trx.sendRawTransaction(rawTransaction);
  await stakingInstance.stake(amount).send()
}

async function unstake() {
  stakingInstance = await tronWeb.contract().at(stakingAddress)
  const amount = document.getElementById('tokenAmount').value*1e18
  await stakingInstance.withdraw(amount).send()
}

async function harvest() {
  stakingInstance = await tronWeb.contract().at(stakingAddress)
  await stakingInstance.getReward().send()
}

$( "#stake" ).click(function() {
  stake()
})

$( "#unstake" ).click(function() {
  unstake()
})

$( "#harvest" ).click(function() {
  harvest()
})