-- CreateTable
CREATE TABLE "staking" (
    "id" SERIAL NOT NULL,
    "exponential_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "blockchain_id" INTEGER NOT NULL,
    "protocol_id" INTEGER NOT NULL,
    "token_0_id" INTEGER NOT NULL,
    "token_0_address" TEXT NOT NULL,
    "overall_risk_rating" TEXT NOT NULL,
    "fundamentals_risk_rating" TEXT NOT NULL,
    "economics_risk_rating" TEXT NOT NULL,
    "asset_strength_rating" TEXT NOT NULL,
    "impermanent_loss_rating" TEXT NOT NULL,
    "impermanent_loss_description" TEXT[],
    "yield_outlook_rating" TEXT NOT NULL,
    "yield_outlook_description" TEXT[],
    "defi_llama_id" TEXT NOT NULL,
    "tvl_usd" DOUBLE PRECISION NOT NULL,
    "tvl_variation_30d" DOUBLE PRECISION NOT NULL,
    "token_0_balance" DOUBLE PRECISION NOT NULL,
    "apy_30d" DOUBLE PRECISION NOT NULL,
    "llama" JSONB NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "staking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staking_address_blockchain_id_key" ON "staking"("address", "blockchain_id");

-- AddForeignKey
ALTER TABLE "staking" ADD CONSTRAINT "staking_blockchain_id_fkey" FOREIGN KEY ("blockchain_id") REFERENCES "blockchains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking" ADD CONSTRAINT "staking_protocol_id_fkey" FOREIGN KEY ("protocol_id") REFERENCES "protocols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking" ADD CONSTRAINT "staking_token_0_id_fkey" FOREIGN KEY ("token_0_id") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
