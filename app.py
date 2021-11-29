import config 
import ccxt
from flask import Flask, render_template
from web3 import Web3
import time


app = Flask(__name__)
w3 = Web3(Web3.HTTPProvider(config.INFURA_URL))

@app.route("/")
def index():
    binance = ccxt.binance()
    ethereum_price = binance.fetch_ticker('ETH/USDC')
    

    eth = w3.eth
    latest_blocks = []
    for block_number in range(eth.block_number, eth.block_number-10, -1):
        block = w3.eth.get_block(block_number)
        latest_blocks.append(block)

    latest_transactions = []
    for txn in latest_blocks[-1]['transactions'][-10:]:
        transaction = eth.get_transaction(txn)
        latest_transactions.append(transaction)

    current_time = time.time()

    return render_template("index.html",ethereum_price=ethereum_price, latest_blocks=latest_blocks, latest_transactions=latest_transactions)

    

@app.route("/address/<addy>")
def address(addy):
    return render_template("address.html",addy=addy)

@app.route("/txn/<hash>")
def transaction(hash):
    transaction = w3.eth.get_transaction(hash)
    return render_template("transaction.html",hash=hash, transaction = transaction)

@app.route("/block/<block_number>")
def block(block_number):
    return render_template("block.html", block_number=block_number)
