import { useContext } from 'react';
import { AppContext } from '../../contexts';

export default function ListUsers({ setDash, dash }) {

	const { stores, persons, setClient, client, typeAccount, setTypeAccount } = useContext(AppContext)

	const items = stores.concat(persons)

	const handleItemClick = (item) => {
		setClient(!client ? item : null);
		setDash(!dash)
	};

	return (
		<div style={{
			marginBottom: 2,
			backgroundColor: '#282c34',
			padding: 6,
		}}>

			<div style={{ marginBottom: 2 }}></div>
			<div style={{ display: 'flex', gap: 6, height: 40, alignItems: 'center' }}>
				<div onClick={() => setTypeAccount('store')} style={{ borderRadius: 4, fontSize: 14, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 35, textAlign: 'center', color: typeAccount === 'store' ? '#2E7D32' : '#aaa' }}>Loja</div>
				<div onClick={() => setTypeAccount('person')} style={{ borderRadius: 4, fontSize: 14, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 35, color: typeAccount === 'person' ? '#2E7D32' : '#aaa' }}>Profissional</div>
			</div>


			{items.map((item, i) => {
				return (
					<div key={i} onClick={() => handleItemClick(item)} style={{ flexDirection: 'row', marginBottom: 2, backgroundColor: client?.id === item.id ? '#2E7D32' : '#21252b', height: 35, display: 'flex', alignItems: 'center', justifyContent: "space-between", padding: '0px 12px' }}>
						<div style={{ color: '#aaa', fontSize: 13, }}>{item.name}</div>

						<div style={{ display: 'flex', alignItems: 'center' }}>
							{item?.profession ? <div style={{ color: '#aaa', fontSize: 12 }}>{item?.profession?.name} / </div> : null}
							<div style={{ color: '#aaa', fontSize: 12, marginLeft:4 }}>{item.type}</div>
						</div>
					</div>
				)
			})}

		</div>
	)
}