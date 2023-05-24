import { Type } from "@sinclair/typebox";
import { FastifyTypebox } from "./types";
import { prisma } from "../providers/prisma";

const schema = {
    params: Type.Object({
        id: Type.Integer(),
    }),
};

async function routes(fastify: FastifyTypebox): Promise<void> {
    fastify.get("/staking/:id", { schema }, async req => {
        const { id } = req.params;
        const staking = await prisma.staking.findUniqueOrThrow({
            where: { id },
            select: {
                blockchain: true,
                protocol: true,
                token0: true,
                address: true,
                apy30d: true,
                assetStrengthRating: true,
                blockchainId: true,
                description: true,
                economicsRiskRating: true,
                fundamentalsRiskRating: true,
                impermanentLossDescription: true,
                id: true,
                impermanentLossRating: true,
                llama: true,
                name: true,
                tvlUSD: true,
                tvlVariation30d: true,
                yieldOutlookDescription: true,
                yieldOutlookRating: true,
                overallRiskRating: true,
            },
        });
        return { ...staking, llama: JSON.parse(staking.llama as string) };
    });
}

export { routes };
