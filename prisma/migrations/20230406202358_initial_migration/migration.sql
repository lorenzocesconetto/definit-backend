-- CreateTable
CREATE TABLE "blockchains" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "native_token_symbol" TEXT NOT NULL,
    "native_token_name" TEXT NOT NULL,
    "uniswap_native_token_contract" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "design_rating" TEXT NOT NULL,
    "design_description" TEXT[],
    "reliability_rating" TEXT NOT NULL,
    "reliability_description" TEXT[],

    CONSTRAINT "blockchains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protocols" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "code_quality_rating" TEXT NOT NULL,
    "code_quality_description" TEXT[],
    "maturity_rating" TEXT NOT NULL,
    "maturity_description" TEXT[],
    "design_rating" TEXT NOT NULL,
    "design_description" TEXT[],
    "collateralization_leverage_rating" TEXT NOT NULL,
    "collateralization_leverage_description" TEXT[],

    CONSTRAINT "protocols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "strength_rating" TEXT NOT NULL,
    "strength_description" TEXT[],
    "volatility_rating" TEXT NOT NULL,
    "volatility_description" TEXT[],

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pools" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "blockchain_id" INTEGER NOT NULL,
    "protocol_id" INTEGER NOT NULL,
    "factory" TEXT NOT NULL,
    "token_0_id" INTEGER NOT NULL,
    "token_1_id" INTEGER NOT NULL,
    "token_0_address" TEXT NOT NULL,
    "token_1_address" TEXT NOT NULL,
    "fee" INTEGER NOT NULL,
    "tick_spacing" INTEGER NOT NULL,
    "overall_risk_rating" TEXT NOT NULL,
    "fundamentals_risk_rating" TEXT NOT NULL,
    "economics_risk_rating" TEXT NOT NULL,
    "impermanent_loss_rating" TEXT NOT NULL,
    "impermanent_loss_description" TEXT[],
    "yield_outlook_rating" TEXT NOT NULL,
    "yield_outlook_description" TEXT[],
    "defi_llama_id" TEXT NOT NULL,

    CONSTRAINT "pools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pools_name_key" ON "pools"("name");

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_blockchain_id_fkey" FOREIGN KEY ("blockchain_id") REFERENCES "blockchains"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_protocol_id_fkey" FOREIGN KEY ("protocol_id") REFERENCES "protocols"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_token_0_id_fkey" FOREIGN KEY ("token_0_id") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pools" ADD CONSTRAINT "pools_token_1_id_fkey" FOREIGN KEY ("token_1_id") REFERENCES "tokens"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
