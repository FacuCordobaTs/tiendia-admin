import { Button } from "@/components/ui/button";
import { Menu, Package2, ListOrdered, Settings, HelpCircle, Mail, Archive } from "lucide-react";
import { NavLink } from "react-router";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";
import AddProductForm from "./AddProductForm";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileAlert from "./ProfileAlert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { FaWhatsapp } from "react-icons/fa";

export default function AdminSidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { user } = useAuth();

  const isProfileComplete = () => {
    if (!user) return true;
    return !!user.profileImageURL && 
           user.businessHours?.some(day => day.active) && 
           !!user.fcmToken && 
           !!user.mp_access_token;
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger className="fixed top-6 left-6 z-50">
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[60vh] max-w-2xl mx-auto border-none shadow-2xl">
            <DrawerHeader>
              <DrawerTitle className="text-3xl font-bold text-gray-800">
                {user?.shopname || "Menu"}
              </DrawerTitle>
            </DrawerHeader>

            <ScrollArea className="h-[40vh] pr-4 grid gap-2 text-lg font-medium">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <Package2 className="h-5 w-5" />
                Productos
              </NavLink>

              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <Archive className="h-5 w-5" />
                Inventario
              </NavLink>

              <AddProductForm
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                }}
              />
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <ListOrdered className="h-5 w-5" />
                Ver Órdenes
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                    isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <Settings className="h-5 w-5" />
                Configuración
              </NavLink>
              <Button
                variant="ghost"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground justify-start"
                onClick={() => setIsHelpOpen(true)}
              >
                <HelpCircle className="h-5 w-5" />
                Ayuda
              </Button>
            </ScrollArea>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r h-screen fixed left-0 top-0 p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {user?.shopname || "Tienda"}
          </h2>
        </div>
        <nav className="grid gap-2 text-lg font-medium">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Package2 className="h-5 w-5" />
            Productos
          </NavLink>

          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Archive className="h-5 w-5" />
            Inventario
          </NavLink>

          <AddProductForm
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
            }}
          />
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <ListOrdered className="h-5 w-5" />
            Ver Órdenes
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-lg px-3 py-2 transition-all ${
                isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Settings className="h-5 w-5" />
            Configuración
          </NavLink>

          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground justify-start"
            onClick={() => setIsHelpOpen(true)}
          >
            <HelpCircle className="h-5 w-5" />
            Ayuda
          </Button>

          {!isProfileComplete() && <ProfileAlert />}
        </nav>
      </aside>

      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">¿Necesitas ayuda?</DialogTitle>
            <DialogDescription className="text-base">
              Para cualquier consulta puedes contactarnos a través de:
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button 
              variant="outline" 
              className="justify-start gap-3 h-12 text-base"
              onClick={() => window.location.href = 'mailto:soporte@ejemplo.com'}
            >
              <Mail className="h-5 w-5" />
              soporte@ejemplo.com
            </Button>
            <Button 
              className="justify-start gap-3 h-12 text-base bg-green-600 hover:bg-green-700 text-white"
              onClick={() => window.open('https://wa.me/5491112345678', '_blank')}
            >
              <FaWhatsapp className="h-5 w-5" />
              +54 9 11 1234-5678
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}