

async function insertCustomer(customer){
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);';
    const values = [customer.nome, customer.idade, customer.uf];
    return await conn.query(sql, values);
}

console.log('SELECT * FROM CLIENTES');
const clientes = await db.selectCustomers();
console.log(clientes);

async function selectCustomers(){
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM clientes;');
    return rows;
}

