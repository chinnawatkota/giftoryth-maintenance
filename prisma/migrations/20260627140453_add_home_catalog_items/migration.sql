-- CreateTable
CREATE TABLE "HomeCatalogItem" (
    "id" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeCatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HomeCatalogItem_slot_key" ON "HomeCatalogItem"("slot");
