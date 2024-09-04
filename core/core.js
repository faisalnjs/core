async function core(action, params) {
    if (!action) return false;
    if (!params) params = {};
    await fetch('https://faisaln.com/core/' + action, { body: JSON.stringify(params) })
        .then(server => server.json())
        .then(server => {
            if (server.actions) {
                server.actions.forEach(async a => {
                    await core(a.action, a.params || null);
                });
            };
            return (server.success) ? true : false;
        })
        .catch(err => {
            console.error(err);
            return false;
        });
};

core(init);