module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    // timestamps define a criação de timestamps quando
    // adicionamos dados ao DB automaticamente
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
