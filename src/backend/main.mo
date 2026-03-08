import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Migration "migration";

(with migration = Migration.run)
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
  let products = Map.empty<Nat, Product>();
  let orderRequests = Map.empty<Nat, OrderRequest>();
  var nextOrderId : Nat = 1;

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
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
