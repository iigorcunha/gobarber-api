# Recuperação de senha

**Requisitos Funcionais**
- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envio em ambiente de dev;
- Utilizart Amazon SES para envios em produção;
- O envio de e-mail deve acontecer em segundo plano (background job);
-

**Regras de Negócio**


- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;


# Atualização do Perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;


**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- as notificações do prestador devem ser armazenadas no mongoDB;
- AS notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;


**RN**

- A notificaçào deve ter um status de lida ou não-lida para que o prestador possa controlar.



# Agendamento de Serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos horário disponível de um prestador;
- O usuário deve poder listar horários dispon;iveis em um dia de um especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h);
- O usuário não pode agender em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços com ele mesmo;