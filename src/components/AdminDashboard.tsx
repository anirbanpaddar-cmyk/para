import React, { useState } from 'react';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Tag, 
  Settings, Plus, Edit, Trash2, Check, AlertCircle, Eye, 
  ShieldCheck, ArrowLeft, ArrowUpDown, DollarSign 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, OrderStatus, Coupon, CakeWeight } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    coupons, 
    storeSettings, 
    updateOrderStatus, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    addCoupon, 
    updateStoreSettings, 
    navigateTo 
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'customers' | 'coupons' | 'settings'>('overview');

  // Product Add / Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Birthday Cakes');
  const [formFlavor, setFormFlavor] = useState('Chocolate');
  const [formRegPrice, setFormRegPrice] = useState(599);
  const [formSalePrice, setFormSalePrice] = useState(499);
  const [formStock, setFormStock] = useState(20);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('/images/products/chocolate-truffle.png');
  const [formEggless, setFormEggless] = useState(true);

  // Coupon modal state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponPercent, setNewCouponPercent] = useState<number>(10);
  const [newCouponMin, setNewCouponMin] = useState<number>(499);
  const [newCouponMax, setNewCouponMax] = useState<number>(200);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Settings form states
  const [storeNameInput, setStoreNameInput] = useState(storeSettings.storeName);
  const [phoneInput, setPhoneInput] = useState(storeSettings.phone);
  const [emailInput, setEmailInput] = useState(storeSettings.email);
  const [addressInput, setAddressInput] = useState(storeSettings.address);
  const [thresholdInput, setThresholdInput] = useState(storeSettings.freeDeliveryThreshold);
  const [deliveryFeeInput, setDeliveryFeeInput] = useState(storeSettings.standardDeliveryCharge);
  const [taxInput, setTaxInput] = useState(storeSettings.taxRatePercent);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Overview calculations
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending' || o.status === 'Preparing').length;
  const completedOrdersCount = orders.filter(o => o.status === 'Delivered').length;
  const lowStockCount = products.filter(p => p.stock < 10).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Birthday Cakes');
    setFormFlavor('Chocolate');
    setFormRegPrice(599);
    setFormSalePrice(499);
    setFormStock(20);
    setFormDesc('Delightful handcrafted cake prepared with pure butter and premium ingredients.');
    setFormImage('/images/products/chocolate-truffle.png');
    setFormEggless(true);
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormFlavor(prod.flavor);
    setFormRegPrice(prod.regularPrice);
    setFormSalePrice(prod.salePrice || prod.regularPrice);
    setFormStock(prod.stock);
    setFormDesc(prod.description);
    setFormImage(prod.image);
    setFormEggless(prod.isEggless);
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        flavor: formFlavor,
        regularPrice: formRegPrice,
        salePrice: formSalePrice,
        stock: formStock,
        description: formDesc,
        image: formImage,
        isEggless: formEggless
      });
    } else {
      addProduct({
        name: formName,
        category: formCategory,
        flavor: formFlavor,
        regularPrice: formRegPrice,
        salePrice: formSalePrice,
        stock: formStock,
        description: formDesc,
        image: formImage,
        gallery: [formImage],
        weightOptions: ['500g', '1kg', '1.5kg', '2kg'],
        isEggless: formEggless,
        egglessAvailable: true,
        ingredients: ['Pure Butter', 'Cocoa', 'Cream', 'Vanilla'],
        allergens: ['Dairy', 'Gluten'],
        isPublished: true
      });
    }

    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      ...storeSettings,
      storeName: storeNameInput,
      phone: phoneInput,
      email: emailInput,
      address: addressInput,
      freeDeliveryThreshold: Number(thresholdInput),
      standardDeliveryCharge: Number(deliveryFeeInput),
      taxRatePercent: Number(taxInput)
    });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponPercent),
      minOrder: Number(newCouponMin),
      maxDiscount: Number(newCouponMax),
      description: newCouponDesc || `${newCouponPercent}% discount on cake orders`,
      expiryDate: '2026-12-31',
      isActive: true
    });
    setIsCouponModalOpen(false);
    setNewCouponCode('');
  };

  return (
    <div className="bg-[#FFFAF7] min-h-screen py-8 sm:py-12 border-b border-[#F7E7EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F7E7EC]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7B2948] bg-[#F7E7EC] px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>WooCommerce Store Administrator</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#34252B] mt-1">
              Cake Paradise Manager Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-4 py-2 bg-white border border-[#E8D3DC] hover:border-[#7B2948] text-xs font-bold text-[#34252B] rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#F7E7EC] pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingCart },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'coupons', label: `Coupons (${coupons.length})`, icon: Tag },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#7B2948] text-white shadow-xs'
                    : 'bg-white border border-[#E8D3DC] text-[#553C46] hover:bg-[#FFFAF7]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview KPIs */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-500">Total Sales</span>
                <p className="font-serif text-2xl font-bold text-[#7B2948] mt-1 tabular-nums">
                  ₹{totalSales.toLocaleString()}
                </p>
                <span className="text-[10px] text-emerald-700 font-semibold">From {totalOrdersCount} orders</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-500">Total Orders</span>
                <p className="font-serif text-2xl font-bold text-[#34252B] mt-1 tabular-nums">
                  {totalOrdersCount}
                </p>
                <span className="text-[10px] text-gray-400">All-time bookings</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-500">Pending & In Oven</span>
                <p className="font-serif text-2xl font-bold text-amber-600 mt-1 tabular-nums">
                  {pendingOrdersCount}
                </p>
                <span className="text-[10px] text-amber-700 font-semibold">Requires kitchen attention</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-500">Completed Orders</span>
                <p className="font-serif text-2xl font-bold text-emerald-700 mt-1 tabular-nums">
                  {completedOrdersCount}
                </p>
                <span className="text-[10px] text-gray-400">Delivered successfully</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs">
                <span className="text-[11px] font-bold uppercase text-gray-500">Low Stock Alert</span>
                <p className="font-serif text-2xl font-bold text-rose-600 mt-1 tabular-nums">
                  {lowStockCount}
                </p>
                <span className="text-[10px] text-rose-700 font-semibold">Under 10 units left</span>
              </div>
            </div>

            {/* Quick Orders List */}
            <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#34252B]">Recent Celebration Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#FFFAF7] text-gray-500 uppercase font-bold text-[10px] border-b border-[#F7E7EC]">
                    <tr>
                      <th className="py-2.5 px-3">Order ID</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Delivery Slot</th>
                      <th className="py-2.5 px-3">Amount</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Update</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F7E7EC]">
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="py-3 px-3 font-mono font-bold text-[#7B2948]">{o.orderNumber}</td>
                        <td className="py-3 px-3 font-medium text-[#34252B]">{o.customer.fullName}</td>
                        <td className="py-3 px-3 text-gray-500">{o.deliveryDate} ({o.deliveryTimeSlot})</td>
                        <td className="py-3 px-3 font-serif font-bold text-[#34252B] tabular-nums">₹{o.total}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F7E7EC] text-[#7B2948]">
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                            className="text-[11px] px-2 py-1 bg-white border border-[#E8D3DC] rounded font-medium"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products Catalog Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#34252B]">
                  Product Catalog ({products.length} Items)
                </h3>
                <p className="text-xs text-[#553C46]">
                  Add new cake varieties, update sale prices, modify inventory stock and publish state.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2.5 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Cake</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#F7E7EC] shadow-2xs overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FFFAF7] text-gray-500 uppercase font-bold text-[10px] border-b border-[#F7E7EC]">
                  <tr>
                    <th className="py-3 px-4">Cake</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Sale Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7E7EC]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 flex items-center gap-2.5">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-serif font-bold text-[#34252B] line-clamp-1">{p.name}</p>
                          <span className="text-[10px] text-gray-400">{p.flavor}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{p.category}</td>
                      <td className="py-3 px-4 font-bold tabular-nums">₹{p.regularPrice}</td>
                      <td className="py-3 px-4 font-bold text-[#7B2948] tabular-nums">
                        {p.salePrice ? `₹${p.salePrice}` : '—'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stock < 10 ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => updateProduct({ ...p, isPublished: !p.isPublished })}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                            p.isPublished ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {p.isPublished ? 'Published' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 text-gray-500 hover:text-[#7B2948] rounded cursor-pointer"
                          title="Edit Cake"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-gray-500 hover:text-rose-600 rounded cursor-pointer"
                          title="Delete Cake"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Orders Lifecycle Management */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#34252B]">
              Order Management ({orders.length} Total)
            </h3>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#F7E7EC]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#7B2948]">{ord.orderNumber}</span>
                      <span className="text-xs text-gray-500">{new Date(ord.createdAt).toLocaleString()}</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F7E7EC] text-[#7B2948]">
                        {ord.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Update Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="text-xs px-2.5 py-1 bg-white border border-[#E8D3DC] rounded-lg font-bold text-[#7B2948]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#553C46]">
                    <div>
                      <strong className="text-[#34252B] block">Customer:</strong>
                      <p>{ord.customer.fullName} ({ord.customer.phone})</p>
                      <p className="truncate text-gray-400">{ord.customer.email}</p>
                    </div>
                    <div>
                      <strong className="text-[#34252B] block">Delivery Location:</strong>
                      <p>{ord.customer.addressLine1}, {ord.customer.city} — {ord.customer.pincode}</p>
                      <p className="text-[#7B2948]">{ord.deliveryDate} ({ord.deliveryTimeSlot})</p>
                    </div>
                    <div>
                      <strong className="text-[#34252B] block">Payment:</strong>
                      <p>{ord.paymentMethod.toUpperCase()} — Total: <span className="font-serif font-bold text-sm text-[#7B2948]">₹{ord.total}</span></p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="bg-[#FFFAF7] p-3 rounded-xl border border-[#E8D3DC] space-y-1">
                    {ord.items.map((i) => (
                      <div key={i.id} className="flex justify-between text-xs">
                        <span>{i.productName} ({i.weight}, {i.isEggless ? 'Eggless' : 'Regular'}) × {i.quantity}</span>
                        <span className="font-bold tabular-nums">₹{i.totalPrice}</span>
                      </div>
                    ))}
                    {ord.orderNotes && (
                      <p className="text-[11px] text-[#7B2948] italic pt-1 border-t border-[#E8D3DC]">
                        Notes: "{ord.orderNotes}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Customers */}
        {activeTab === 'customers' && (
          <div className="bg-white p-6 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#34252B]">
              Registered Customers & Guest Orders
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FFFAF7] text-gray-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Phone</th>
                    <th className="py-2.5 px-3">City</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F7E7EC]">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold text-[#34252B]">Priya Sen</td>
                    <td className="py-3 px-3">priya.sen@example.com</td>
                    <td className="py-3 px-3">+91 98300 45678</td>
                    <td className="py-3 px-3">Ballygunge, Kolkata (700019)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold text-[#34252B]">Aarav Mukherjee</td>
                    <td className="py-3 px-3">aarav.m@example.com</td>
                    <td className="py-3 px-3">+91 98301 23456</td>
                    <td className="py-3 px-3">Park Street, Kolkata (700016)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-3 font-bold text-[#34252B]">Pooja Banerjee</td>
                    <td className="py-3 px-3">pooja.b@example.com</td>
                    <td className="py-3 px-3">+91 98312 99881</td>
                    <td className="py-3 px-3">Salt Lake Sector V, Kolkata (700091)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Coupon Management */}
        {activeTab === 'coupons' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-[#34252B]">
                Discount Coupons & Offers
              </h3>
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-4 py-2 bg-[#7B2948] text-white text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Create Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="bg-white p-5 rounded-2xl border border-[#F7E7EC] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#7B2948] bg-[#F7E7EC] px-2 py-0.5 rounded">
                      {c.code}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Active</span>
                  </div>
                  <p className="text-xs text-[#34252B] font-medium">{c.description}</p>
                  <div className="text-[11px] text-gray-500 space-y-0.5 pt-2 border-t border-[#F7E7EC]">
                    <p>Min Order: ₹{c.minOrder}</p>
                    <p>Expiry: {c.expiryDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Store Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#F7E7EC] shadow-2xs max-w-2xl space-y-6">
            <h3 className="font-serif text-xl font-bold text-[#34252B]">
              Store & Delivery Settings
            </h3>

            {settingsSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Store configuration saved successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Store Name</label>
                <input
                  type="text"
                  value={storeNameInput}
                  onChange={(e) => setStoreNameInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Phone Helpline</label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Support Email</label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Bakery Atelier Address</label>
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Free Delivery Min (₹)</label>
                  <input
                    type="number"
                    value={thresholdInput}
                    onChange={(e) => setThresholdInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Standard Delivery (₹)</label>
                  <input
                    type="number"
                    value={deliveryFeeInput}
                    onChange={(e) => setDeliveryFeeInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">GST Tax Rate (%)</label>
                  <input
                    type="number"
                    value={taxInput}
                    onChange={(e) => setTaxInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#7B2948] text-white font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
              >
                Save Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#F7E7EC] space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-lg text-[#34252B]">
              {editingProduct ? 'Edit Cake Details' : 'Add New Cake to Catalog'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Cake Title *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Belgian Truffle Delight"
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Flavor</label>
                  <input
                    type="text"
                    value={formFlavor}
                    onChange={(e) => setFormFlavor(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formRegPrice}
                    onChange={(e) => setFormRegPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Sale Price (₹)</label>
                  <input
                    type="number"
                    value={formSalePrice}
                    onChange={(e) => setFormSalePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Stock</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={formEggless}
                  onChange={(e) => setFormEggless(e.target.checked)}
                  className="accent-[#7B2948]"
                />
                <span className="font-semibold text-[#34252B]">100% Eggless Pure Vegetarian</span>
              </label>

              <div className="flex gap-2 pt-3 border-t border-[#F7E7EC]">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7B2948] text-white font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold uppercase rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Coupon Modal */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#F7E7EC] space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#34252B]">Create Discount Coupon</h3>
            <form onSubmit={handleAddCouponSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE25"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 uppercase bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCouponPercent}
                    onChange={(e) => setNewCouponPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Min Order</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#34252B] uppercase mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={newCouponMax}
                    onChange={(e) => setNewCouponMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#34252B] uppercase mb-1">Promo Description</label>
                <input
                  type="text"
                  placeholder="e.g. 25% OFF on festival bookings"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFAF7] border border-[#E8D3DC] rounded-lg"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-[#F7E7EC]">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#7B2948] text-white font-bold uppercase rounded-lg hover:bg-[#621F38] cursor-pointer"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={() => setIsCouponModalOpen(false)}
                  className="px-4 py-2.5 bg-gray-100 text-gray-700 font-bold uppercase rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
