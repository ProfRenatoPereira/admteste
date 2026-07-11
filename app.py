import os
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Rota principal que carrega o painel
@app.route('/')
def index():
    return render_template('index.html')

# API Endpoints para processamento rápido (AJAX)
@app.route('/api/calculo-markup', methods=['POST'])
def calcular_markup():
    data = request.get_json()
    custo_total = float(data.get('custo_total', 0))
    margem_lucro = float(data.get('margem_lucro', 0)) # Em porcentagem
    impostos = float(data.get('impostos', 0)) # Em porcentagem
    
    # Cálculo básico de Mark-up Multiplicador
    denominador = 1 - ((margem_lucro + impostos) / 100)
    if denominador <= 0:
        return jsonify({'error': 'Margem ou impostos muito altos'}), 400
        
    markup = 1 / denominador
    preco_venda = custo_total * markup
    
    return jsonify({
        'markup': round(markup, 2),
        'preco_venda': round(preco_venda, 2)
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
