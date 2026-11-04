package dev.codesfb.api.domain;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import java.sql.Array;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Converter
public class StringListArrayConverter implements AttributeConverter<List<String>, Array> {

    @Override
    public Array convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null) {
            attribute = new ArrayList<>();
        }
        
        // This method receives a Connection from Hibernate when binding parameters
        // For now, return null and let Hibernate handle it via @JdbcTypeCode
        return null;
    }

    @Override
    public List<String> convertToEntityAttribute(Array dbData) {
        if (dbData == null) {
            return new ArrayList<>();
        }
        
        try {
            Object array = dbData.getArray();
            if (array instanceof String[] stringArray) {
                return new ArrayList<>(Arrays.asList(stringArray));
            }
        } catch (SQLException e) {
            throw new RuntimeException("Failed to convert SQL Array to List<String>", e);
        }
        
        return new ArrayList<>();
    }
}
