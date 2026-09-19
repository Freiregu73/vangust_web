const VangustAuth = (() => {
    const CHAVE_SESSAO = 'vangust_admin_logado';
    const DADOS_USUARIO = 'vangust_admin_dados';

    async function login(email, senha) {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('senha', senha);

        try {
            const resposta = await fetch('http://localhost/api_hamburgueria/login.php', {
                method: 'POST',
                body: formData
            });

            if (resposta.ok) {
                const dados = await resposta.json();
                sessionStorage.setItem(CHAVE_SESSAO, '1');
                sessionStorage.setItem(DADOS_USUARIO, JSON.stringify(dados.usuario));
                return true;
            }
            return false;
        } catch (erro) {
            console.error("Erro ao conectar com a API de login:", erro);
            return false;
        }
    }

    function estaLogado() {
        return sessionStorage.getItem(CHAVE_SESSAO) === '1';
    }

    function exigirLogin() {
        if (!estaLogado()) {
            window.location.href = 'index.html';
        }
    }

    function logout() {
        sessionStorage.removeItem(CHAVE_SESSAO);
        sessionStorage.removeItem(DADOS_USUARIO);
        window.location.href = 'index.html';
    }

    function getUsuarioLogado() {
        const dados = sessionStorage.getItem(DADOS_USUARIO);
        return dados ? JSON.parse(dados) : null;
    }

    return { login, estaLogado, exigirLogin, logout, getUsuarioLogado };
})();