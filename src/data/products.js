import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import casingObsidian from '@/assets/casing-obsidian.jpg';
import casingLapis from '@/assets/casing-lapis.jpg';
import casingPalladium from '@/assets/casing-palladium.jpg';
import casingOrange from '@/assets/casing-orange.jpg';
import detailCamera from '@/assets/detail-camera.jpg';
import detailSide from '@/assets/detail-side.jpg';
import accessoryBox from '@/assets/accessory-box.jpg';
import fullKit from '@/assets/full-kit.jpg';

export const products = [
    // HOUSINGS
    {
        id: 1,
        name: "Lapis Housing Mark IV",
        category: "Housings",
        price: 450,
        image: casingLapis,
        material: "Lapis Lazuli",
        availability: "In Stock",
        slug: "lapis-housing-mark-iv",
        description: "Deep blue Lapis Lazuli housing with natural pyrite inclusions."
    },
    {
        id: 2,
        name: "Obsidian Shell",
        category: "Housings",
        price: 550,
        image: casingObsidian,
        material: "Obsidian",
        availability: "In Stock",
        slug: "obsidian-shell",
        description: "Volcanic glass finish. Fingerprint magnet, but worth it."
    },
    {
        id: 3,
        name: "Palladium Core",
        category: "Housings",
        price: 1200,
        image: casingPalladium,
        material: "Palladium",
        availability: "Limited",
        slug: "palladium-core",
        description: "Rare metal housing. Cold to the touch, heavy in the hand."
    },
    {
        id: 4,
        name: "Weird Orange Edition",
        category: "Housings",
        price: 450,
        image: casingOrange,
        material: "Ceramic",
        availability: "In Stock",
        slug: "weird-orange-housing",
        description: "High-visibility ceramic coating. Impossible to lose."
    },

    // HARDWARE / COMPLETE BUILDS
    {
        id: 5,
        name: "The WeirdPhone: Full Kit",
        category: "Builds",
        price: 3500,
        image: fullKit,
        material: "Mixed",
        availability: "Made to Order",
        slug: "weirdphone-full-kit",
        description: "The complete experience. Housing, internals, and concierge membership."
    },
    {
        id: 6,
        name: "Camera Module Ring",
        category: "Hardware",
        price: 150,
        image: detailCamera,
        material: "Titanium",
        availability: "In Stock",
        slug: "camera-module-ring",
        description: "Reinforced titanium ring for the camera array."
    },
    {
        id: 7,
        name: "Side Rail System",
        category: "Hardware",
        price: 250,
        image: detailSide,
        material: "Steel",
        availability: "In Stock",
        slug: "side-rail-system",
        description: "Surgical grade steel rails for structural integrity."
    },

    // ACCESSORIES
    {
        id: 8,
        name: "M.Concierge Gift Box",
        category: "Accessories",
        price: 85,
        image: accessoryBox,
        material: "Card / Velvet",
        availability: "In Stock",
        slug: "concierge-gift-box",
        description: "Premium unboxing experience for gifts."
    },
    {
        id: 9,
        name: "Service Kit",
        category: "Accessories",
        price: 45,
        image: product3,
        material: "Synthetic",
        availability: "In Stock",
        slug: "service-kit",
        description: "Tools and cloths to keep your WeirdPhone pristine."
    },

    // LEGACY / EXTRA
    {
        id: 10,
        name: "Prototype 01",
        category: "Archive",
        price: 9999,
        image: product1,
        material: "Unknown",
        availability: "Out of Stock",
        slug: "prototype-01",
        description: "Early development unit. Determining function..."
    }
];
