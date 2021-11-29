import config 
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(config.INFURA_URL))

print(w3.eth.block_number)

balance = w3.eth.get_balance('0x2AE4Bf5130c1D0e0634bE2Cb624b202c7C038a93')

print(balance)

ether_balance = w3.fromWei(balance, 'ether')

print(ether_balance)