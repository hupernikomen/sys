import { useState } from "react"

export default function ListUsers({ indice, typeAccount, setTypeAccount, stores, persons, setClient, client }) {

	const [filter, setFilter] = useState('');

	const handleButtonClick = (value) => {
		setFilter(value === filter ? '' : value);
		setTypeAccount(value === typeAccount ? '' : value);
	};

	const handleItemClick = (item) => {
		setClient(!client ? item : null);
	};

	const items = filter
		? stores.concat(persons).filter((item) => item.type === filter)
		: stores.concat(persons);

	return (
		<div style={{
			gridRow: '1 / span 2',
			gridColumn: `${indice} / span 1`,
			backgroundColor: '#282c34',
			padding: 6,
		}}>

			<div style={{ height: 40, marginBottom: 6 }}></div>
			<div style={{ marginBottom: 6, display: 'flex', gap: 6, height: 35, alignItems: 'center' }}>
				<div onClick={() => handleButtonClick('store')} style={{ borderRadius: 4, fontSize: 14, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 35, textAlign: 'center', backgroundColor: typeAccount === 'store' ? '#2E7D32' : '#21252b', color: '#aaa' }}>Loja</div>
				<div onClick={() => handleButtonClick('person')} style={{ borderRadius: 4, fontSize: 14, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 35, backgroundColor: typeAccount === 'person' ? '#2E7D32' : '#21252b', color: '#aaa' }}>Profissional</div>
			</div>


			{items.map((item, i) => {
				return (
					<div key={i} onClick={() => handleItemClick(item)} style={{ flexDirection: 'row', marginBottom:6, backgroundColor: '#21252b', height: 40, display: 'flex', alignItems: 'center', justifyContent: "space-between", padding: '0px 12px' }}>
						<div style={{ color: '#aaa', fontSize: 13, }}>{item.name}</div>
						<div style={{ color: '#aaa', fontSize: 12 }}>{item.type}</div>
					</div>
				)
			})}

		</div>
	)
}