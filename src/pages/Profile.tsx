import AdminSidebar from "@/components/AdminSidebar"
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  Image, PencilLine } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { user, loading, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    shopname: user?.shopname || "",
    address: user?.address || "",
    profileImageURL: user?.profileImageURL || "",
    imageBase64: "",
  });
  const [logoPreview, setLogoPreview] = useState("");


  const handleSubmit = async ()=> {
    const result = await updateProfile(formData.username, formData.shopname, formData.address, formData.imageBase64, user?.businessHours);
    if (result && user && user.address && user.profileImageURL) { 
      setFormData({
        ...formData,
        username: user.username,
        shopname: user.shopname,
      })
      if (user.address && user.profileImageURL) {
        setFormData({
          ...formData,
          address: user.address,
          profileImageURL: user.profileImageURL
        })
      }
    }
  }

  const toBase64 = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'username' ? value.replace(/\s/g, '') : value
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imgB64 = await toBase64(file);
      setFormData({...formData, imageBase64: imgB64})
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setLogoPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Skeleton className="h-9 w-[200px] mb-4" />
        <div className="space-y-4">
          <Skeleton className="h-[180px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    );
  }



  return (
    <div>
      <AdminSidebar />
      <Card className="md:mt-6 md:ml-72 mt-24 ml-4 mr-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Image className="h-6 w-6 text-primary" />
            Identidad de la Tienda
          </CardTitle>
          <CardDescription>Personaliza la información pública de tu tienda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="space-y-2">
              <Label className="text-sm">Logo de la tienda</Label>
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2">
                  {
                    logoPreview
                    ?
                      <AvatarImage src={logoPreview} />
                    :
                      user?.profileImageURL
                      ?
                      <AvatarImage src={user.profileImageURL} />
                      :
                      <AvatarImage src={logoPreview} />
                  }
                  <AvatarFallback className="bg-muted text-2xl">
                    {user?.shopname?.[0] || "T"}
                  </AvatarFallback>
                </Avatar>
                <Label 
                  htmlFor="logo-upload"
                  className="absolute bottom-0 right-0 bg-background p-1.5 rounded-full border cursor-pointer shadow-sm hover:bg-muted transition-colors"
                >
                  <PencilLine className="h-4 w-4" />
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>

            <div className="flex-1 space-y-4 w-full">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="shopname">Nombre de la Tienda</Label>
                  <Input
                    id="shopname"
                    name="shopname"
                    value={formData.shopname}
                    onChange={handleInputChange}
                    placeholder="Ej: Moda Urbana"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Ej: modaurbana"
                  />
                  <p className="text-sm text-muted-foreground">
                    URL: www.shop.ai/{formData.username || 'username'}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección de la Tienda</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Ej: Av. Principal 123"
                />
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button onClick={handleSubmit}>Guardar Cambios</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Profile