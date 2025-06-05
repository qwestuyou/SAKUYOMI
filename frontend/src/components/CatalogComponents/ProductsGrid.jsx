import React from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {FaRegHeart, FaHeart, FaShoppingCart} from "react-icons/fa";

const ProductsGrid = ({currentProducts, wishlist, toggleWishlist, addToCart, catalogStyles}) => {
    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" layout>
            {currentProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants} layout>
                    <Link
                        to={`/product/${product.id}`}
                        className={`${catalogStyles.cardBg} relative rounded-3xl backdrop-blur-xl bg-white/10 dark:bg-white/5 border border-white/10 shadow-xl hover:shadow-2xl overflow-hidden p-10 flex flex-col h-full`}
                    >
                        <motion.div
                            className="relative mb-4 flex justify-center"
                            whileHover={{scale: 1.03}}
                            transition={{duration: 0.3}}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-xl w-[250px] h-[300px] object-cover"
                                loading="lazy"
                            />
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleWishlist(product.id);
                                }}
                                className={`absolute top-3 right-3 text-2xl ${catalogStyles.wishlistBtnBg} ${catalogStyles.wishlistBtnBorder} p-2 rounded-full shadow-md transition-all duration-300 border`}
                                aria-label={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                title={wishlist.includes(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                            >
                                <motion.div animate={wishlist.includes(product.id) ? {scale: [1, 1.2, 1]} : {}}
                                            transition={{duration: 0.3}}>
                                    {wishlist.includes(product.id) ? (
                                        <FaHeart className="text-red-500"/>
                                    ) : (
                                        <FaRegHeart
                                            className={`${catalogStyles.wishlistEmptyHeartColor} hover:text-red-400 transition-colors`}/>
                                    )}
                                </motion.div>
                            </button>
                        </motion.div>
                        <div className="flex-1 flex flex-col justify-between">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-1 truncate">{product.name}</h3>
                                <p className="text-sm opacity-70 line-clamp-2">{product.description}</p>
                            </div>
                            <div className="flex items-center justify-between mt-auto">
                                <p className={`font-bold ${catalogStyles.headingColor} text-xl leading-none`}>{product.price} ₴</p>
                                <motion.button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(product);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm shadow-md border border-white/30 backdrop-blur-md transition-all duration-300"
                                    aria-label="Add to cart"
                                    title="Add to cart"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 5px 15px rgba(245, 156, 158, 0.4)",
                                    }}
                                    whileTap={{scale: 0.95}}
                                >
                                    <motion.span animate={{x: [0, 2, 0]}} transition={{repeat: Infinity, duration: 2}}>
                                        <FaShoppingCart className="text-base"/>
                                    </motion.span>
                                    <span>Add to cart</span>
                                </motion.button>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default ProductsGrid;