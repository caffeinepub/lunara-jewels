import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// No data migration needed. This is static data only.

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  public type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  public type OrderRequest = {
    id : Nat;
    customerName : Text;
    customerEmail : Text;
    shippingNote : Text;
    items : [CartItem];
    totalAmount : Nat;
    timestamp : Time.Time;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  // BEGIN GENERATED PRODUCTS
  let products = Map.fromIter<Nat, Product>(
    ([
      {
        id = 1;
        name = "Oxidized Silver Ring";
        description = "Beautiful handcrafted ring.";
        price = 5000;
        imageUrl = "/assets/generated/ring-image1.jpg";
      },
      {
        id = 2;
        name = "Silver Pendant";
        description = "Elegant silver pendant with oxidized finish.";
        price = 7500;
        imageUrl = "/assets/generated/pendant1.jpg";
      },
      {
        id = 3;
        name = "Bracelet";
        description = "Stylish oxidized silver bracelet.";
        price = 12000;
        imageUrl = "/assets/generated/bracelet1.jpg";
      },
      {
        id = 4;
        name = "Silver Earrings";
        description = "Delicate oxidized silver earrings.";
        price = 9500;
        imageUrl = "/assets/generated/silver-earrings1.jpg";
      },
      {
        id = 5;
        name = "Silver Necklace";
        description = "Oxidized silver necklace with intricate design.";
        price = 15000;
        imageUrl = "/assets/generated/necklace1.jpg";
      },
      {
        id = 6;
        name = "Silver Brooch";
        description = "Unique oxidized silver brooch.";
        price = 10500;
        imageUrl = "/assets/generated/brooch1.jpg";
      },
      {
        id = 7;
        name = "Silver Keychain";
        description = "Handmade oxidized silver keychain.";
        price = 6000;
        imageUrl = "/assets/generated/keychain1.jpg";
      },
      {
        id = 8;
        name = "Silver Cufflinks";
        description = "High-quality oxidized silver cufflinks.";
        price = 14500;
        imageUrl = "/assets/generated/cufflinks1.jpg";
      },
      {
        id = 9;
        name = "Silver Anklet";
        description = "Stylish oxidized silver anklet.";
        price = 8000;
        imageUrl = "/assets/generated/anklet1.jpg";
      },
      {
        id = 10;
        name = "Silver Hairpin";
        description = "Elegant oxidized silver hairpin.";
        price = 9200;
        imageUrl = "/assets/generated/hairpin1.jpg";
      },
      {
        id = 11;
        name = "Silver Tiara";
        description = "Beautiful oxidized silver tiara with gemstones.";
        price = 25000;
        imageUrl = "/assets/generated/tiara1.jpg";
      },
      {
        id = 12;
        name = "Silver Belt Buckle";
        description = "Handcrafted oxidized silver belt buckle.";
        price = 11000;
        imageUrl = "/assets/generated/belt-buckle1.jpg";
      },
      {
        id = 13;
        name = "Silver Charm Bracelet";
        description = "Customizable oxidized silver charm bracelet.";
        price = 13800;
        imageUrl = "/assets/generated/charm-bracelet1.jpg";
      },
      {
        id = 14;
        name = "Silver Tie Clip";
        description = "Fashionable oxidized silver tie clip.";
        price = 10000;
        imageUrl = "/assets/generated/tie-clip1.jpg";
      },
      {
        id = 15;
        name = "Silver Nose Ring";
        description = "Trendy oxidized silver nose ring.";
        price = 3200;
        imageUrl = "/assets/generated/nose-ring1.jpg";
      },
      {
        id = 16;
        name = "Men's Silver Ring";
        description = "Bold and sturdy oxidized silver ring.";
        price = 14000;
        imageUrl = "/assets/generated/mens-ring1.jpg";
      },
      {
        id = 17;
        name = "Women's Silver Brooch";
        description = "Chic women's oxidized silver brooch.";
        price = 7800;
        imageUrl = "/assets/generated/women-brooch1.jpg";
      },
      {
        id = 18;
        name = "Kid's Silver Pendant";
        description = "Cute oxidized silver pendant for kids.";
        price = 4100;
        imageUrl = "/assets/generated/kid-pendant1.jpg";
      },
      {
        id = 19;
        name = "Ring with Stones";
        description = "Ring with embedded stones.";
        price = 17450;
        imageUrl = "/assets/generated/ring-stones1.jpg";
      },
      {
        id = 20;
        name = "Unique Art-Silver Piece";
        description = "Unique-to-store art-silver piece!";
        price = 33000;
        imageUrl = "/assets/generated/unique_art_piece1.jpg";
      },
    ] : [Product]).values().map(func(p) { (p.id, p) })
  );
  // END GENERATED PRODUCTS

  let orderRequests = Map.empty<Nat, OrderRequest>();
  var nextOrderId : Nat = 1;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Functions (Public - guests allowed)
  public query ({ caller }) func getProduct(id : Nat) : async Product {
    switch (products.get(id)) {
      case (?product) { product };
      case (null) { Runtime.trap("Product not found") };
    };
  };

  public query ({ caller }) func listProducts() : async [Product] {
    products.values().toArray();
  };

  // Order Functions
  public shared ({ caller }) func submitOrderRequest(
    customerName : Text,
    customerEmail : Text,
    shippingNote : Text,
    items : [CartItem],
    totalAmount : Nat,
  ) : async Nat {
    // Public function - guests can submit orders
    let orderId = nextOrderId;
    nextOrderId += 1;

    let orderRequest : OrderRequest = {
      id = orderId;
      customerName;
      customerEmail;
      shippingNote;
      items;
      totalAmount;
      timestamp = Time.now();
    };

    orderRequests.add(orderId, orderRequest);
    orderId;
  };

  public query ({ caller }) func getOrderRequest(id : Nat) : async ?OrderRequest {
    // Admin only - order requests contain private customer information
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view order requests");
    };
    orderRequests.get(id);
  };

  public query ({ caller }) func listOrderRequests() : async [OrderRequest] {
    // Admin only - order requests contain private customer information
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view order requests");
    };
    orderRequests.values().toArray();
  };

  // Product Management (Admin only)
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    if (not products.containsKey(product.id)) {
      Runtime.trap("Product not found");
    };
    products.add(product.id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Nat) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(id)) {
      Runtime.trap("Product not found");
    };
    products.remove(id);
  };
};
