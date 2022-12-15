import { TGetPoolSubgraph } from "../services/getPoolSubgraph";

const getPoolEarnings30d = (subgraph: TGetPoolSubgraph): number => {
    const fees30d = subgraph.reduce(
        (accumulator, currValue) => accumulator + parseFloat(currValue.feesUSD),
        0 // initial value
    );
    return fees30d;
};

export { getPoolEarnings30d };
