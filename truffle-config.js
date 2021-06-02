module.exports = {
    contracts_build_directory: "./artifacts",
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*" // Match any network id
      }
    },
    compilers: {
      solc: {
        version: "0.7.3"
      }
    }
  };