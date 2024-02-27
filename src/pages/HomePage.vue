<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <v-card class="border-none" variant="outlined">
        <v-layout>
            <v-app-bar color="#1EA4CE" prominent height="79" class="topBarTitle">
                <v-toolbar-title class="text-center"><img src="/src/images/Logo.png" alt="" /></v-toolbar-title>

                <template class="mx-auto me-16 d-flex align-center" width="138" height="78" color="#147594">
                    <v-dialog width="500">
                        <template #activator="{ props }">
                            <v-btn v-bind="props">
                                <i class="fa fa-shopping-basket"></i> <v-text class="ms-2">₺ {{ totalBasketPrice }}</v-text></v-btn
                            >
                        </template>

                        <template #default="{ isActive }">
                            <v-card title="Sepet">
                                <v-card>
                                    <v-card-text>
                                        <!-- Sepet içeriği -->
                                        <div v-for="(item, index) in basket" :key="index">
                                            <v-row>
                                                <v-col>
                                                    <p class="basketProductName">{{ item.name }}</p>
                                                    {{ item.price }}
                                                </v-col>
                                                <v-row class="mt-2 justify-end me-2">
                                                    <v-btn variant="text" class="reduceAndIncrease" size="30" @click="decreaseItemQuantity(index)">-</v-btn>
                                                    <h2 class="basketCounter">{{ item.quantity }}</h2>
                                                    <v-btn variant="text" class="reduceAndIncrease" size="30" @click="increaseItemQuantity(index)">+</v-btn>
                                                </v-row>
                                            </v-row>
                                            <hr class="mt-5 mb-5" />
                                        </div>
                                    </v-card-text>
                                    <div class="d-flex justify-end">
                                        <!-- Toplam fiyat -->
                                        <div class="rightBoxTotalPrice">₺ {{ totalBasketPrice }}</div>
                                    </div>
                                </v-card>

                                <v-card-actions>
                                    <v-spacer variant="none"></v-spacer>

                                    <v-btn text="Kapat" @click="isActive.value = false"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </template>
            </v-app-bar>
            <!--Filter-->
            <v-main class="main-content d-flex flex-row">
                <!--Filter Sort-->
                <v-col cols="3" sm="4" md="4" lg="3" class="mx-auto d-none d-sm-block">
                    <v-card class="mx-auto mt-4 leftBoxCard">
                        <v-card-title class="headline">Sort</v-card-title>
                        <v-card-text>
                            <v-checkbox v-model="sortByPriceLowToHigh" :disabled="sortByPriceHighToLow" label="Price low to high" hide-details></v-checkbox>
                            <v-checkbox v-model="sortByPriceHighToLow" :disabled="sortByPriceLowToHigh" label="Price high to low" hide-details></v-checkbox>
                        </v-card-text>
                    </v-card>
                    <!--Filter Sort End-->
                    <!--Filter Brands-->
                    <v-card class="mx-auto mt-4 brands-card leftBoxCard">
                        <v-card-title class="headline">brands</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="searchBrand" variant="outlined" class="w-75 mx-auto" placeholder="Search Brand"></v-text-field>
                            <v-checkbox v-model="selectAll" @change="selectAllBrands" label="Select All" hide-details></v-checkbox>
                            <v-checkbox
                                v-for="(brand, index) in uniqueBrands"
                                :key="index"
                                v-model="selectedBrands[brand]"
                                :label="brand"
                                hide-details
                            ></v-checkbox>
                        </v-card-text>
                    </v-card>
                    <!--Filter Brands End-->
                    <!--Filter Tags-->
                    <v-card class="mx-auto mt-4 brands-card leftBoxCard">
                        <v-card-title class="headline">Tags</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="searchTag" variant="outlined" class="w-75 mx-auto" placeholder="Search tag"></v-text-field>
                            <v-checkbox v-model="selectTagsAll" @change="selectAllTags" label="Select All" hide-details></v-checkbox>
                            <v-checkbox v-for="(tag, index) in filteredTags" :key="index" v-model="selectedTags[tag]" :label="tag" hide-details></v-checkbox>
                        </v-card-text>
                    </v-card>
                    <!--Filter Tags End-->
                </v-col>
                <!--Filter End-->

                <!--Product Card-->
                <v-col class="mt-5" cols="12" sm="8" md="8" lg="7">
                    <v-title><h2>Products</h2></v-title>
                    <v-actions class="d-flex flex-row justify-space-between">
                        <div class="mb-4">
                            <v-btn class="productCardBtn mr-2" width="5%">Add</v-btn>
                            <v-btn class="productCardBtnTwo" width="5%">shirt</v-btn>
                        </div>
                        <!--Filter Card-->
                        <div class="d-block d-sm-none">
                            <v-row justify="space-around">
                                <v-col cols="auto">
                                    <v-dialog transition="dialog-top-transition" width="auto">
                                        <template #activator="{ props }">
                                            <v-btn color="primary" v-bind="props">Filter</v-btn>
                                        </template>
                                        <template #default="{ isActive }">
                                            <v-card>
                                                <v-toolbar color="primary" title="Opening Filter"></v-toolbar>
                                                <v-card-text>
                                                    <v-card class="mx-auto mt-4 leftBoxCard">
                                                        <v-card-title class="headline">Sort</v-card-title>
                                                        <v-card-text>
                                                            <v-checkbox
                                                                v-model="sortByPriceLowToHigh"
                                                                :disabled="sortByPriceHighToLow"
                                                                label="Price low to high"
                                                                hide-details
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                v-model="sortByPriceHighToLow"
                                                                :disabled="sortByPriceLowToHigh"
                                                                label="Price high to low"
                                                                hide-details
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                    <!--Filter Sort End-->
                                                    <!--Filter Brands-->
                                                    <v-card class="mx-auto mt-4 brands-card leftBoxCard">
                                                        <v-card-title class="headline">brands</v-card-title>
                                                        <v-card-text>
                                                            <v-text-field
                                                                v-model="searchBrand"
                                                                variant="outlined"
                                                                class="w-75 mx-auto"
                                                                placeholder="Search Brand"
                                                            ></v-text-field>
                                                            <v-checkbox
                                                                v-model="selectAll"
                                                                @change="selectAllBrands"
                                                                label="Select All"
                                                                hide-details
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                v-for="(brand, index) in uniqueBrands"
                                                                :key="index"
                                                                v-model="selectedBrands[brand]"
                                                                :label="brand"
                                                                hide-details
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                    <!--Filter Brands End-->
                                                    <!--Filter Tags-->
                                                    <v-card class="mx-auto mt-4 brands-card leftBoxCard">
                                                        <v-card-title class="headline">Tags</v-card-title>
                                                        <v-card-text>
                                                            <v-text-field
                                                                v-model="searchTag"
                                                                variant="outlined"
                                                                class="w-75 mx-auto"
                                                                placeholder="Search tag"
                                                            ></v-text-field>
                                                            <v-checkbox
                                                                v-model="selectTagsAll"
                                                                @change="selectAllTags"
                                                                label="Select All"
                                                                hide-details
                                                            ></v-checkbox>
                                                            <v-checkbox
                                                                v-for="(tag, index) in filteredTags"
                                                                :key="index"
                                                                v-model="selectedTags[tag]"
                                                                :label="tag"
                                                                hide-details
                                                            ></v-checkbox>
                                                        </v-card-text>
                                                    </v-card>
                                                    <!--Filter Tags End-->
                                                </v-card-text>
                                                <v-card-actions class="justify-end">
                                                    <v-btn @click="isActive.value = false">Kapat</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </template>
                                    </v-dialog>
                                </v-col>
                            </v-row>
                        </div>
                        <!--Filter Card End-->
                    </v-actions>
                    <v-form>
                        <v-row>
                            <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, index) in slicedItems" :key="index">
                                <v-card class="product-card">
                                    <div class="productCardImage"><v-img src="/src/images/Image Area.png"></v-img></div>
                                    <v-card-title>₺ {{ item.price }}</v-card-title>
                                    <v-card-text class="productCard-name">{{ item.tags }}</v-card-text>
                                    <v-card-text class="productCard-name">{{ item.manufacturer }}</v-card-text>
                                    <v-card-text class="productCard-name">{{ item.name }}</v-card-text>
                                    <v-card-actions>
                                        <v-btn class="productCardBtn" width="100%" @click="addItemToBasket(item)">Add</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-form>
                    <div class="text-center">
                        <v-pagination
                            :length="Math.ceil(filteredItems.length / itemsPerPage)"
                            :total-visible="7"
                            v-model="currentPage"
                            class="mt-4"
                        ></v-pagination>
                    </div>
                </v-col>
                <!--Product Card End-->

                <!--Total Price-->

                <v-col cols="3" md="4" lg="2" class="d-none d-lg-block d-xl-block">
                    <v-card class="mx-auto mt-5 totalPriceAndBasket d-xs-none">
                        <v-card-text>
                            <!-- Sepet içeriği -->
                            <div v-for="(item, index) in basket" :key="index">
                                <v-row>
                                    <v-col>
                                        <p class="basketProductName">{{ item.name }}</p>
                                        {{ item.price }}
                                    </v-col>
                                    <v-row class="mt-2 justify-end me-2">
                                        <v-btn variant="text" class="reduceAndIncrease" size="30" @click="decreaseItemQuantity(index)">-</v-btn>
                                        <h2 class="basketCounter">{{ item.quantity }}</h2>
                                        <v-btn variant="text" class="reduceAndIncrease" size="30" @click="increaseItemQuantity(index)">+</v-btn>
                                    </v-row>
                                </v-row>
                                <hr class="mt-5 mb-5" />
                            </div>
                        </v-card-text>
                        <div class="d-flex justify-end">
                            <!-- Toplam fiyat -->
                            <div class="rightBoxTotalPrice">₺ {{ totalBasketPrice }}</div>
                        </div>
                    </v-card>
                </v-col>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue"
import itemsData from "../../items_2.json"
import { itemModel } from "@/models/entities/itemModels"

const itemsArray = ref([] as Array<itemModel>)
const currentPage = ref(1)
const itemsPerPage = 16
const selectAll = ref(false)
const selectTagsAll = ref(false)
//tiplerini burada belirttim
const selectedBrands = ref<Record<string, boolean>>({})
const selectedTags = ref<Record<string, boolean>>({})

const sortByPriceLowToHigh = ref(false)
const sortByPriceHighToLow = ref(false)
const basket = ref([] as Array<itemModel>)
const searchTag = ref("")
const searchBrand = ref("")

itemsArray.value.forEach((item) => {
    item.quantity = 1 // varsayılan olarak miktarı 1 olarak ayarlayın
})

const increaseItemQuantity = (index: number) => {
    basket.value[index].quantity++ // Miktarı arttır
    // Ürün miktarı arttığında toplam fiyatı güncelle
    updateTotalBasketPrice()
}

const decreaseItemQuantity = (index: number) => {
    if (basket.value[index].quantity > 1) {
        basket.value[index].quantity--
        // Ürün miktarı azaldığında toplam fiyatı güncelle
        updateTotalBasketPrice()
    }
}
// sepetin toplam fiyatını hesaplama
const updateTotalBasketPrice = () => {
    let totalPrice = 0
    basket.value.forEach((item) => {
        totalPrice += item.price * item.quantity
    })
    return totalPrice.toFixed(2)
}

const addItemToBasket = (item: itemModel) => {
    // Sepette aynı ürün zaten var mı kontrol et
    const existingItemIndex = basket.value.findIndex((basketItem) => basketItem.name === item.name)

    if (existingItemIndex !== -1) {
        // Eğer varsa miktarını artır
        basket.value[existingItemIndex].quantity += 1
    } else {
        // Yoksa yeni ürünü sepete ekle
        const newItem = { ...item }
        newItem.quantity = 1
        basket.value.push(newItem)
    }

    updateTotalBasketPrice() // Toplam fiyatı güncelle
}

// Sepetin toplam fiyatını hesaplamak için hesaplama fonksiyonu
const totalBasketPrice = computed(() => {
    return basket.value.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
})

// Pagination Sayfalama tarafı
const slicedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredItems.value.slice(startIndex, endIndex) // sadece mevcut sayfada görüntülenmesi gereken ürünler alınır
})

// brands tarafında filtreleme için kullanılır
const uniqueBrands = computed(() => {
    if (searchBrand.value.trim() === "") {
        return Array.from(new Set(itemsArray.value.map((item) => item.manufacturer)))
    } else {
        return Array.from(
            new Set(
                itemsArray.value.filter((item) => item.manufacturer.toLowerCase().includes(searchBrand.value.toLowerCase())).map((item) => item.manufacturer)
            )
        )
    }
})

const uniqueTags = computed(() => {
    const tags = new Set<string>()
    itemsArray.value.forEach((item) => {
        item.tags.forEach((tag) => {
            tags.add(tag)
        })
    })
    return Array.from(tags)
})
// bu tarafta fiyatları sıralar
const filteredItems = computed(() => {
    let filtered = itemsArray.value

    if (Object.keys(selectedBrands.value).length > 0) {
        filtered = filtered.filter((item) => selectedBrands.value[item.manufacturer])
    }

    if (Object.keys(selectedTags.value).length > 0) {
        filtered = filtered.filter((item) => {
            return item.tags.some((tag) => selectedTags.value[tag])
        })
    }

    if (sortByPriceLowToHigh.value) {
        filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortByPriceHighToLow.value) {
        filtered = filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
})

// tags tarafı searchbar kullanımı
const filteredTags = computed(() => {
    if (searchTag.value.trim() === "") {
        return uniqueTags.value
    } else {
        return uniqueTags.value.filter((tag) => tag.toLowerCase().includes(searchTag.value.toLowerCase()))
    }
})

//tüm markaların seçili olup olmadığını belirler.
const selectAllTags = () => {
    const selected: Record<string, boolean> = {}
    uniqueTags.value.forEach((tags) => {
        selected[tags] = true
    })
    selectedTags.value = selected
    if (selectTagsAll.value) {
        const selected: Record<string, boolean> = {}
        uniqueTags.value.forEach((tags) => {
            selected[tags] = true
        })
        selectedTags.value = selected
    } else {
        selectedTags.value = {}
    }
}

const selectAllBrands = () => {
    const selected: Record<string, boolean> = {}
    uniqueBrands.value.forEach((brand) => {
        selected[brand] = true
    })
    selectedBrands.value = selected
    if (selectAll.value) {
        const selected: Record<string, boolean> = {}
        uniqueBrands.value.forEach((brand) => {
            selected[brand] = true
        })
        selectedBrands.value = selected
    } else {
        selectedBrands.value = {}
    }
}
onMounted(() => {
    // Diziye quantity alanını ekleyerek itemsData'yı itemsArray'e atama
    itemsArray.value = itemsData.map((item) => {
        return { ...item, quantity: 1 }
    })
})
</script>
<style>
.productCardBtn {
    color: white !important;
    box-shadow: none !important;
    background-color: #1ea4ce !important;
}
.productCardBtnTwo {
    color: #1ea4ce !important;
    box-shadow: none !important;
    background-color: #f2f0fd !important;
}
.productCardImage {
    padding: 10px;
    border-radius: 20px;
    border: 2px solid;
    border-color: #f3f0fe;
}
.totalPriceAndBasket {
    border: 10px solid !important;
    border-color: #1ea4ce !important;
}
.rightBoxTotalPrice {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    border: 5px solid !important;
    margin-bottom: 15px;
    margin-right: 20px;
    border-color: #1ea4ce !important;
}
.productCard-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.brands-card {
    overflow-y: scroll !important;
    height: 250px;
}
.basketProductName {
    max-width: 190px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.basketCounter {
    background-color: #1ea4ce;
    padding: 7px;
    margin-left: 5px;
    margin-right: 5px;
    height: 36px;
    color: white;
}
.reduceAndIncrease {
    color: #1ea4ce !important;
    font-size: 30px !important;
}
</style>
