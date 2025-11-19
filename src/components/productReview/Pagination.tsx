import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    
    return pages;
  };

  return (
    <View className="flex-row items-center justify-center mt-8" style={{ gap: 8 }}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white"
        style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
      >
        <AntDesign name="left" size={16} color={currentPage === 1 ? "#9CA3AF" : "#000"} />
      </TouchableOpacity>

      {getPageNumbers().map((page, index) => (
        <View key={index}>
          {page === "..." ? (
            <Text className="px-3 py-2 text-gray-600">...</Text>
          ) : (
            <TouchableOpacity
              onPress={() => onPageChange(page as number)}
              className={`h-10 px-4 rounded-lg border ${
                currentPage === page
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 bg-white"
              }`}
            >
              <Text className={`${
                currentPage === page ? "text-white font-medium" : "text-gray-900"
              }`}>
                {page}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white"
        style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
      >
        <AntDesign name="right" size={16} color={currentPage === totalPages ? "#9CA3AF" : "#000"} />
      </TouchableOpacity>
    </View>
  );
};
