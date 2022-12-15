import { TGetPoolSubgraph } from "../services";

const getPoolVolume30d = (subgraph: TGetPoolSubgraph) => {
    return subgraph.reduce((cum, curr) => cum + parseFloat(curr.volumeUSD), 0);
};

export { getPoolVolume30d };
