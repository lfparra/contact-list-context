const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			url: "https://assets.breatheco.de/apis/fake/contact/",
			agenda: "LeoParra",
			contacts: null,
			contact: {
				agenda_slug: "",
				full_name: "",
				email: "",
				phone: "",
				address: ""
			},
			error: null
		},

		actions: {
			handleChange: e => {
				const store = getStore();
				let { contact } = store;
				contact.agenda_slug = store.agenda;
				contact[e.target.name] = e.target.value;

				setStore({ contact });
			},
			setContact: contact => {
				setStore({ contact });
			},
			getContacts: () => {
				const store = getStore();
				fetch(`${store.url}agenda/${store.agenda}`)
					.then(resp => resp.json())
					.then(data => setStore({ contacts: data }))
					.catch(error => setStore({ error }));
			},
			addContact: () => {
				const store = getStore();
				fetch(`${store.url}`, {
					method: "POST",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			},
			editContact: () => {
				const store = getStore();
				fetch(`${store.url}${store.contact.id}`, {
					method: "PUT",
					body: JSON.stringify(store.contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			},
			delContact: () => {
				const store = getStore();
				fetch(`${store.url}${store.contact.id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(resp => resp.json())
					.then(data => getActions().getContacts())
					.catch(error => setStore({ error }));
			}
		}
	};
};

export default getState;
